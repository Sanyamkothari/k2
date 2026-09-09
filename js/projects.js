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

    projects[category].forEach(project => {
      const hasImage = Boolean(project.image);

      const projectCard = document.createElement('div');
      projectCard.className = hasImage ? 'project' : 'project no-image';

      // Projects we have a photograph for open the full-screen preview.
      // Projects still awaiting a photograph show a placeholder card instead.
      let media;
      if (hasImage) {
        projectCard.addEventListener('click', () => openModal(project.image, project.title));

        media = document.createElement('img');
        media.src = project.image;
        media.alt = project.title;
        media.loading = 'lazy';
      } else {
        media = document.createElement('div');
        media.className = 'project-placeholder';

        const icon = document.createElement('i');
        icon.className = 'fas fa-drafting-compass';
        icon.setAttribute('aria-hidden', 'true');

        const label = document.createElement('span');
        label.textContent = 'Photograph coming soon';

        media.appendChild(icon);
        media.appendChild(label);
      }

      const content = document.createElement('div');
      content.className = 'content';

      const title = document.createElement('h3');
      title.textContent = project.title;

      const desc = document.createElement('p');
      desc.textContent = project.description;

      content.appendChild(title);
      content.appendChild(desc);
      projectCard.appendChild(media);
      projectCard.appendChild(content);

      projectsContainer.appendChild(projectCard);
    });

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
