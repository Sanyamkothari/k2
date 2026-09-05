/**
 * K2 ARCHITECTS — MODERN CLIENTSIDE INTERACTIONS
 * Floating Glass Nav, Metric Counters, Mobile Drawer, Light Dismiss
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Floating Pill Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 2. Mobile Navigation Drawer Handler
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileClose = document.getElementById('mobile-close');

  if (mobileToggle && mobileDrawer) {
    const toggleMenu = (open) => {
      mobileDrawer.classList.toggle('open', open);
      mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      toggleMenu(!isOpen);
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', () => toggleMenu(false));
    }

    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        toggleMenu(false);
      }
    });

    // Close on clicking any link inside drawer
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

  // 3. Metric Counter Animation (IntersectionObserver)
  const metricNumbers = document.querySelectorAll('.metric-number');
  if (metricNumbers.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          if (!isNaN(target)) {
            let count = 0;
            const step = Math.max(1, Math.ceil(target / 40));
            const timer = setInterval(() => {
              count += step;
              if (count >= target) {
                el.textContent = target;
                clearInterval(timer);
              } else {
                el.textContent = count;
              }
            }, 30);
          }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    metricNumbers.forEach(num => counterObserver.observe(num));
  }

  // 4. Smooth Anchor Scrolling & Active Nav Highlight
  const navLinks = document.querySelectorAll('.nav-link-item');
  const sections = document.querySelectorAll('section[id]');

  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else if (link.getAttribute('href').startsWith('#')) {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(sec => sectionObserver.observe(sec));
  }
});
