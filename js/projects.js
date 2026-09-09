/**
 * Projects Gallery Module
 * Handles fetching projects data, rendering categories, and modal preview.
 */

let cachedProjectsData = null;

// Load projects from data/projects.json with caching
async function loadProjects() {
  if (cachedProjectsData) {
    return cachedProjectsData;
  }
  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    cachedProjectsData = await response.json();
    return cachedProjectsData;
  } catch (error) {
    console.error('Failed to load projects:', error);
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
      projectsContainer.innerHTML = '<p style="grid-column: 1/-1; color: #777;">Unable to load projects at this time. Please try again later.</p>';
    }
    return null;
  }
}

// Display projects for a specific category
function showProjects(category) {
  loadProjects().then(projects => {
    if (!projects || !projects[category]) return;

    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';

    // Projects we hold a photograph of are shown as cards in the grid.
    const photographed = projects[category].filter(project => project.image);

    photographed.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project';
      projectCard.addEventListener('click', () => openModal(project.image, project.title));

      const img = document.createElement('img');
      img.src = project.image;
      img.alt = project.title;
      img.loading = 'lazy';

      const content = document.createElement('div');
      content.className = 'content';

      const title = document.createElement('h3');
      title.textContent = project.title;

      const desc = document.createElement('p');
      desc.textContent = project.description;

      content.appendChild(title);
      content.appendChild(desc);
      projectCard.appendChild(img);
      projectCard.appendChild(content);

      projectsContainer.appendChild(projectCard);
    });

    // The rest are listed by name below the grid rather than as empty cards.
    renderMoreProjects(
      projects[category].filter(project => !project.image),
      photographed.length
    );

    // Update active button state
    document.querySelectorAll('.buttons button').forEach(btn => {
      btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[onclick="showProjects('${category}')"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }
  });
}

// List the projects in a sector that have no photograph yet
function renderMoreProjects(projects, photographedCount) {
  const section = document.getElementById('more-projects');
  const list = document.getElementById('more-projects-list');
  const heading = document.getElementById('more-projects-title');
  if (!section || !list) return;

  list.innerHTML = '';
  section.hidden = projects.length === 0;
  if (projects.length === 0) return;

  // Without a grid above it, this list is the sector, not an addition to it.
  heading.textContent = photographedCount
    ? 'More Projects in This Sector'
    : 'Projects in This Sector';

  projects.forEach(project => {
    const item = document.createElement('li');
    item.className = 'more-project';

    const name = document.createElement('span');
    name.className = 'more-project-name';
    name.textContent = project.title;

    const city = document.createElement('span');
    city.className = 'more-project-city';
    city.textContent = project.description;

    item.appendChild(name);
    item.appendChild(city);
    list.appendChild(item);
  });
}

// Modal handling
function openModal(imageSrc, imageAlt = 'Project Image') {
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modal-image');
  if (modal && modalImage) {
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modal.style.display = 'flex';
  }
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Expose functions globally for inline HTML event handlers
window.showProjects = showProjects;
window.openModal = openModal;
window.closeModal = closeModal;

// Initialize gallery events
function initGallery() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.id === 'modal-image') {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }

  // Load default category (engineering / Schools)
  showProjects('engineering');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGallery);
} else {
  initGallery();
}
