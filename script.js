const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Expandable service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    const wasOpen = card.classList.contains('expanded');
    serviceCards.forEach(item => {
      item.classList.remove('expanded');
      item.setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
      card.classList.add('expanded');
      card.setAttribute('aria-expanded', 'true');
    }
  });
});

// Subtle hero parallax on desktop
const visual = document.querySelector('.visual-shell');
if (visual && window.matchMedia('(pointer:fine)').matches) {
  visual.addEventListener('mousemove', (e) => {
    const rect = visual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - .5;
    const y = (e.clientY - rect.top) / rect.height - .5;
    visual.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${y * -4}deg) translateY(-2px)`;
  });
  visual.addEventListener('mouseleave', () => {
    visual.style.transform = '';
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
