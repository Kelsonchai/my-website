// Nav shadow on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile burger menu
const burger = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Quote form — mailto fallback (no backend required)
document.getElementById('quoteForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const company = document.getElementById('company').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nPhone: ${phone}\nService: ${service}\n\n${message}`
  );
  window.location.href =
    `mailto:kelsonchai12345@gmail.com?subject=FirmMatch SG Quote Request — ${encodeURIComponent(name)}&body=${body}`;
});

// Fade-in on scroll
const style = document.createElement('style');
style.textContent = '.reveal { opacity: 0; transform: translateY(18px); transition: opacity .5s ease, transform .5s ease; } .reveal.visible { opacity: 1; transform: none; }';
document.head.appendChild(style);

const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
  { threshold: 0.1 }
);
document.querySelectorAll('.card, .stat-card, .step, .section-header, .why__text, .hero__trust').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});
