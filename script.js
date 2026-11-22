
// Année automatique dans le pied de page
const yearElement = document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Défilement fluide vers les sections
document.querySelectorAll('.main-nav a, .hero-actions a, .footer-links a').forEach(link => {
  link.addEventListener('click', function (event) {
    const targetId = this.getAttribute('href');

    if (targetId && targetId.startsWith('#')) {
      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Mise en évidence de la rubrique visible dans le menu
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === '#' + entry.target.id;

          if (active) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, {
    rootMargin: '-25% 0px -60% 0px'
  });

  sections.forEach(section => observer.observe(section));
}
