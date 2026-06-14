// ── Nav scroll shadow ──────────────────────────────────────
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// ── Mobile burger menu ─────────────────────────────────────
const burger   = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links');
if (burger && navLinks) {
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
}

// ── Scroll fade-in ─────────────────────────────────────────
const revealStyle = document.createElement('style');
revealStyle.textContent = '.reveal{opacity:0;transform:translateY(18px);transition:opacity .5s ease,transform .5s ease}.reveal.visible{opacity:1;transform:none}';
document.head.appendChild(revealStyle);

const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.08 }
);
document.querySelectorAll('.card, .stat-card, .step, .section-header, .why__text, .hero__trust, .faq__item, .form-section-block, .legal-block').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Form validation
function requireOneChecked(formId, fieldName, message) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', event => {
    if (!form.querySelector(`input[name="${fieldName}"]:checked`)) {
      event.preventDefault();
      alert(message);
    }
  });
}

requireOneChecked('clientForm', 'service', 'Please select at least one service.');
requireOneChecked(
  'partnerForm',
  'firm_service',
  'Please select at least one service your firm offers.'
);
