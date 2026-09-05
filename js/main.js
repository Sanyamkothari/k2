/**
 * K2 Architects - Global Main Script
 * Handles global navbar scroll effects, mobile hamburger menu, preloader, and smooth scroll.
 */

function initMain() {
  // Mobile burger / navbar-toggler animation
  const burger = document.getElementById('burger') || document.querySelector('.navbar-toggler');
  if (burger && !burger.dataset.bound) {
    burger.dataset.bound = 'true';
    burger.addEventListener('click', () => {
      burger.classList.toggle('show');
    });
  }

  // Smooth scroll back to top button
  const scrollBtn = document.querySelector('.scroll-btn');
  if (scrollBtn && !scrollBtn.dataset.bound) {
    scrollBtn.dataset.bound = 'true';
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollBtn.style.display = 'flex';
      } else {
        scrollBtn.style.display = 'none';
      }
    });
  }

  // Navbar background change on scroll
  const navbar = document.getElementById('navbar');
  if (navbar && !navbar.dataset.bound) {
    navbar.dataset.bound = 'true';
    const updateNavbar = () => {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Run once on initial load
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain);
} else {
  initMain();
}

// Preloader fade-out on window complete load
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
}

if (document.readyState === 'complete') {
  hidePreloader();
} else {
  window.addEventListener('load', hidePreloader);
}
