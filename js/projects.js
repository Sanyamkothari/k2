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
      projectCard.addEventListener('click', () => openModal(project));

      // A card with several views is not obviously browsable, so it says so.
      const views = projectImages(project);
      if (views.length > 1) {
        const badge = document.createElement('div');
        badge.className = 'photo-badge';
        const badgeIcon = document.createElement('i');
        badgeIcon.className = 'fas fa-images';
        badgeIcon.setAttribute('aria-hidden', 'true');
        badge.appendChild(badgeIcon);
        badge.appendChild(document.createTextNode(String(views.length)));
        projectCard.appendChild(badge);
      }

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

// Modal gallery
let galleryImages = [];
let galleryIndex = 0;

// Every view we hold of a project, oldest field first for older entries.
function projectImages(project) {
  if (Array.isArray(project.images) && project.images.length) {
    return project.images;
  }
  return project.image ? [project.image] : [];
}

function showGalleryImage(index) {
  const modalImage = document.getElementById('modal-image');
  const counter = document.getElementById('modal-counter');
  const dots = document.getElementById('modal-dots');
  if (!modalImage || !galleryImages.length) return;

  // Wrap around so the arrows never dead-end.
  galleryIndex = (index + galleryImages.length) % galleryImages.length;

  // Some of the older elevations are only a few hundred pixels wide and would
  // sit like postage stamps in a full-screen overlay. Let those scale up, but
  // never past twice their real size, where they would turn to mush.
  const fit = () => {
    modalImage.style.width = modalImage.naturalWidth && modalImage.naturalWidth < 640
      ? modalImage.naturalWidth * 2 + 'px'
      : '';
    modalImage.style.opacity = '1';
  };

  modalImage.style.opacity = '0';
  modalImage.onload = fit;
  modalImage.src = galleryImages[galleryIndex];
  if (modalImage.complete) {
    fit();
  }

  if (counter) {
    counter.textContent = (galleryIndex + 1) + ' / ' + galleryImages.length;
  }
  if (dots) {
    dots.querySelectorAll('.modal-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === galleryIndex);
    });
  }

  // Keep the neighbouring views warm so paging through feels instant.
  [galleryIndex + 1, galleryIndex - 1].forEach(i => {
    const neighbour = galleryImages[(i + galleryImages.length) % galleryImages.length];
    if (neighbour) new Image().src = neighbour;
  });
}

function changeGalleryImage(step) {
  showGalleryImage(galleryIndex + step);
}

function openModal(project, fallbackTitle) {
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modal-image');
  if (!modal || !modalImage) return;

  // Accept a bare image source too, so older callers keep working.
  const data = typeof project === 'string'
    ? { images: [project], title: fallbackTitle || 'Project Image', description: '' }
    : project;

  galleryImages = projectImages(data);
  if (!galleryImages.length) return;

  modalImage.alt = data.title || 'Project Image';

  const title = document.getElementById('modal-title');
  const desc = document.getElementById('modal-desc');
  if (title) title.textContent = data.title || '';
  if (desc) desc.textContent = data.description || '';

  // A single view needs no arrows, counter or dots.
  const multiple = galleryImages.length > 1;
  ['modal-prev', 'modal-next', 'modal-counter', 'modal-dots'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.hidden = !multiple;
  });

  const dots = document.getElementById('modal-dots');
  if (dots) {
    dots.innerHTML = '';
    if (multiple) {
      galleryImages.forEach((image, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'modal-dot';
        dot.setAttribute('aria-label', 'View image ' + (i + 1));
        dot.addEventListener('click', () => showGalleryImage(i));
        dots.appendChild(dot);
      });
    }
  }

  showGalleryImage(0);
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'none';
  }
  document.body.classList.remove('modal-open');
}

// Expose functions globally for inline HTML event handlers
window.showProjects = showProjects;
window.openModal = openModal;
window.closeModal = closeModal;
window.changeGalleryImage = changeGalleryImage;

// Initialize gallery events
function initGallery() {
  const modal = document.getElementById('modal');
  if (modal) {
    // Only the backdrop closes; clicking the photo itself would fight the arrows.
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    const prev = document.getElementById('modal-prev');
    const next = document.getElementById('modal-next');
    if (prev) prev.addEventListener('click', () => changeGalleryImage(-1));
    if (next) next.addEventListener('click', () => changeGalleryImage(1));

    document.addEventListener('keydown', (e) => {
      if (modal.style.display !== 'flex') return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') changeGalleryImage(-1);
      if (e.key === 'ArrowRight') changeGalleryImage(1);
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
