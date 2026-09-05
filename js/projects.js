/**
 * K2 ARCHITECTS — PROJECTS GALLERY LOADER & NATIVE MODAL
 * Category filtering, live search, and accessible <dialog> light dismiss.
 */

let allProjectsData = {};
let currentCategory = 'all';
let searchQuery = '';

const categoryLabels = {
  engineering: 'Schools & Campuses',
  residential: 'Residential & Commercial',
  hostel: 'Public Buildings & Hostels',
  bungalow: 'Bungalows & Farmhouses',
  banquets: 'Banquets & Hospitality',
  medi: 'Hospitals & Medi-Complex',
  college: 'Colleges & Universities'
};

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('projects-container');
  const projectCounter = document.getElementById('project-count');
  const searchInput = document.getElementById('search-projects');
  const filterButtons = document.querySelectorAll('.category-pill-btn');
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // 1. Fetch Projects Data
  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) throw new Error('Failed to load projects');
    allProjectsData = await response.json();
  } catch (err) {
    console.error('Error fetching projects.json:', err);
    container.innerHTML = `
      <div class="empty-state-wrap">
        <div class="empty-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
        <h3>Unable to load projects</h3>
        <p>Please check your connection and refresh the page.</p>
      </div>
    `;
    return;
  }

  // 2. Read URL Category Parameter
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam && (categoryParam in allProjectsData || categoryParam === 'all')) {
    currentCategory = categoryParam;
    filterButtons.forEach(btn => {
      if (btn.getAttribute('data-category') === categoryParam) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // 3. Render Projects Function
  const renderProjects = () => {
    let list = [];
    if (currentCategory === 'all') {
      Object.keys(allProjectsData).forEach(cat => {
        allProjectsData[cat].forEach(p => {
          list.push({ ...p, categoryKey: cat });
        });
      });
    } else if (allProjectsData[currentCategory]) {
      list = allProjectsData[currentCategory].map(p => ({
        ...p,
        categoryKey: currentCategory
      }));
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (projectCounter) {
      projectCounter.textContent = `Showing ${list.length} Works`;
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div class="empty-state-wrap">
          <div class="empty-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
          <h3>No matching projects found</h3>
          <p>Try searching for a different city, keyword, or selecting another category.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(item => `
      <article class="project-item-card" data-id="${item.id}" data-title="${encodeURIComponent(item.title || '')}" data-desc="${encodeURIComponent(item.description || '')}" data-img="${item.image}" data-cat="${encodeURIComponent(categoryLabels[item.categoryKey] || item.categoryKey)}">
        <div class="project-thumb-box">
          <img src="${item.image}" alt="${item.title || 'Architectural Project'}" loading="lazy" onerror="this.src='images/bg4.jpg'" />
          <span class="project-category-tag">${categoryLabels[item.categoryKey] || item.categoryKey}</span>
        </div>
        <div class="project-info-body">
          <div>
            <h3 class="project-title-text">${item.title || 'Architectural Design'}</h3>
            <div class="project-location-text">
              <i class="fa-solid fa-location-dot"></i>
              <span>${item.description || 'India'}</span>
            </div>
          </div>
          <div class="project-view-action">
            <span>Inspect Blueprint & Photos</span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </div>
        </div>
      </article>
    `).join('');

    // Attach click events for modal inspection
    container.querySelectorAll('.project-item-card').forEach(card => {
      card.addEventListener('click', () => {
        openProjectModal({
          title: decodeURIComponent(card.getAttribute('data-title')),
          desc: decodeURIComponent(card.getAttribute('data-desc')),
          img: card.getAttribute('data-img'),
          category: decodeURIComponent(card.getAttribute('data-cat'))
        });
      });
    });
  };

  // 4. Modal Open & Close logic using <dialog closedby="any"> and light-dismiss fallback
  const openProjectModal = (proj) => {
    if (!projectModal) return;
    document.getElementById('modal-img').src = proj.img;
    document.getElementById('modal-img').alt = proj.title;
    document.getElementById('modal-title').textContent = proj.title;
    document.getElementById('modal-loc').textContent = proj.desc;
    document.getElementById('modal-category').textContent = proj.category;

    if (typeof projectModal.showModal === 'function') {
      projectModal.showModal();
    } else {
      projectModal.setAttribute('open', '');
    }
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    if (typeof projectModal.close === 'function') {
      projectModal.close();
    } else {
      projectModal.removeAttribute('open');
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  // Light dismiss fallback for browsers without closedby support
  if (projectModal && !('closedBy' in HTMLDialogElement.prototype)) {
    projectModal.addEventListener('click', (event) => {
      if (event.target !== projectModal) return;
      const rect = projectModal.getBoundingClientRect();
      const isContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isContent) {
        closeProjectModal();
      }
    });
  }

  // 5. Category Button Click Listener
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');

      // Update URL query string without reloading
      const newUrl = new URL(window.location);
      if (currentCategory === 'all') {
        newUrl.searchParams.delete('category');
      } else {
        newUrl.searchParams.set('category', currentCategory);
      }
      window.history.replaceState({}, '', newUrl);

      renderProjects();
    });
  });

  // 6. Live Search Input Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProjects();
    });
  }

  // Initial Render
  renderProjects();
});
