/**
 * Projects Gallery Module
 * Fetches data/projects.json, renders category grids and drives the
 * full-screen gallery modal (multi-image carousel with keyboard support).
 */

let cachedProjectsData = null;

// Modal state
const gallery = {
  images: [],
  index: 0,
  title: '',
  description: '',
  lastFocus: null,
};

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
      projectsContainer.innerHTML = '<p style="grid-column: 1/-1; color: #666;">Unable to load projects at this time. Please try again later.</p>';
    }
    return null;
  }
}

function buildCard(project) {
  const images = project.images && project.images.length ? project.images : [project.image];

  const card = document.createElement('div');
  card.className = 'project';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Open gallery: ${project.title}, ${project.description}`);

  const open = () => openModal(images, project.title, project.description, card);
  card.addEventListener('click', open);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  });

  if (images.length > 1) {
    const badge = document.createElement('span');
    badge.className = 'photo-badge';
    badge.innerHTML = `<i class="fas fa-images" aria-hidden="true"></i>${images.length}`;
    card.appendChild(badge);
  }

  const img = document.createElement('img');
  img.src = project.thumb || project.image;
  img.alt = `${project.title}, ${project.description}`;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.width = 640;
  img.height = 200;

  const content = document.createElement('div');
  content.className = 'content';

  const title = document.createElement('h2');
  title.textContent = project.title;

  const desc = document.createElement('p');
  desc.textContent = project.description;

  content.appendChild(title);
  content.appendChild(desc);
  card.appendChild(img);
  card.appendChild(content);
  return card;
}

// Display projects for a specific category
function showProjects(category) {
  loadProjects().then((projects) => {
    if (!projects || !projects[category]) return;

    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';
    projects[category].forEach((project) => projectsContainer.appendChild(buildCard(project)));

    // Update active button state
    document.querySelectorAll('.buttons button').forEach((btn) => {
      const isActive = btn.dataset.category === category;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  });
}

/* ---------------- Modal ---------------- */

function renderSlide() {
  const modalImage = document.getElementById('modal-image');
  const counter = document.getElementById('modal-counter');
  const dots = document.getElementById('modal-dots');
  const prev = document.getElementById('modal-prev');
  const next = document.getElementById('modal-next');
  const total = gallery.images.length;
  const multi = total > 1;

  modalImage.style.opacity = '0.4';
  modalImage.onload = () => { modalImage.style.opacity = '1'; };
  modalImage.src = gallery.images[gallery.index];
  modalImage.alt = `${gallery.title}, ${gallery.description} (image ${gallery.index + 1} of ${total})`;

  counter.textContent = multi ? `${gallery.index + 1} / ${total}` : '';
  counter.hidden = !multi;
  prev.hidden = !multi;
  next.hidden = !multi;

  dots.innerHTML = '';
  if (multi) {
    gallery.images.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'modal-dot' + (i === gallery.index ? ' active' : '');
      dot.setAttribute('aria-label', `Show image ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dots.appendChild(dot);
    });
  }
}

function goTo(i) {
  const total = gallery.images.length;
  gallery.index = (i + total) % total;
  renderSlide();
}

function openModal(images, title = '', description = '', trigger = null) {
  const modal = document.getElementById('modal');
  if (!modal) return;
  gallery.images = Array.isArray(images) ? images : [images];
  gallery.index = 0;
  gallery.title = title;
  gallery.description = description;
  gallery.lastFocus = trigger || document.activeElement;

  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent = description;
  renderSlide();

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  document.getElementById('modal-close').focus();
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (!modal || modal.style.display === 'none' || !modal.style.display) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
  if (gallery.lastFocus && typeof gallery.lastFocus.focus === 'function') {
    gallery.lastFocus.focus();
  }
}

// Expose for any inline handlers
window.showProjects = showProjects;
window.openModal = openModal;
window.closeModal = closeModal;

// Initialize gallery events
function initGallery() {
  document.querySelectorAll('.buttons button[data-category]').forEach((btn) => {
    btn.addEventListener('click', () => showProjects(btn.dataset.category));
  });

  const modal = document.getElementById('modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      // Close when clicking the dark backdrop (not the image, controls or captions)
      if (e.target === modal || e.target.classList.contains('modal-content-wrapper')) {
        closeModal();
      }
    });
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-prev').addEventListener('click', () => goTo(gallery.index - 1));
    document.getElementById('modal-next').addEventListener('click', () => goTo(gallery.index + 1));

    document.addEventListener('keydown', (e) => {
      if (modal.style.display !== 'flex') return;
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowLeft') goTo(gallery.index - 1);
      else if (e.key === 'ArrowRight') goTo(gallery.index + 1);
    });

    // Basic swipe support on touch devices
    let touchX = null;
    modal.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    modal.addEventListener('touchend', (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 50 && gallery.images.length > 1) goTo(gallery.index + (dx < 0 ? 1 : -1));
    });
  }

  // Load default category
  const first = document.querySelector('.buttons button[data-category]');
  showProjects(first ? first.dataset.category : 'engineering');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGallery);
} else {
  initGallery();
}
