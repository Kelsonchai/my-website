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

// ── Helpers ────────────────────────────────────────────────
function getChecked(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(el => el.value).join(', ') || '—';
}
function getRadio(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : '—';
}
function val(id) {
  const el = document.getElementById(id);
  return el ? (el.value.trim() || '—') : '—';
}
function showSuccess(formId, successId) {
  const form = document.getElementById(formId);
  const box  = document.getElementById(successId);
  if (form) form.style.display = 'none';
  if (box)  box.style.display  = 'block';
}

// ── Client Enquiry Form ────────────────────────────────────
const clientForm = document.getElementById('clientForm');
if (clientForm) {
  clientForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const services = getChecked('service');
    if (services === '—') { alert('Please select at least one service.'); return; }

    const subject = encodeURIComponent(`[FirmMatch SG] New Enquiry — ${val('company_name')}`);
    const body = encodeURIComponent(
`=== CLIENT ENQUIRY ===

COMPANY INFORMATION
Company Name   : ${val('company_name')}
UEN            : ${val('uen')}
Industry       : ${val('industry')}
Annual Revenue : ${val('annual_revenue')}

CONTACT DETAILS
Contact Person : ${val('contact_name')}
Email          : ${val('contact_email')}
Phone/WhatsApp : ${val('contact_phone')}
Preferred Via  : ${val('preferred_contact')}

SERVICES REQUIRED
${services}

BUSINESS VOLUME
Monthly Sales Invoices    : ${val('sales_invoices')}
Monthly Purchase Invoices : ${val('purchase_invoices')}
Monthly Bank Transactions : ${val('bank_transactions')}
Number of Employees       : ${val('employees')}
GST Registered            : ${getRadio('gst')}
Deadline / Urgency        : ${val('deadline')}

ADDITIONAL NOTES
${val('notes')}

---
Submitted via FirmMatch SG`
    );

    window.location.href = `mailto:hello.firmmatchsg@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => showSuccess('clientForm', 'form-success'), 1000);
  });
}

// ── Partner Registration Form ──────────────────────────────
const partnerForm = document.getElementById('partnerForm');
if (partnerForm) {
  partnerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const services = getChecked('firm_service');
    if (services === '—') { alert('Please select at least one service your firm offers.'); return; }

    const subject = encodeURIComponent(`[FirmMatch SG] Partner Application — ${val('firm_name')}`);
    const body = encodeURIComponent(
`=== PARTNER APPLICATION ===

FIRM PROFILE
Firm Name      : ${val('firm_name')}
UEN            : ${val('firm_uen')}
Contact Person : ${val('firm_contact')}
Email          : ${val('firm_email')}
Phone/WhatsApp : ${val('firm_phone')}
Website        : ${val('firm_website')}

SERVICES OFFERED
${services}

FEES & CAPACITY
Minimum Monthly Fee : ${val('min_fee')}
Capacity            : ${val('capacity')}
Industry Focus      : ${val('industry_focus')}

AUDIT & LICENCE STATUS
Licensed PAE         : ${getRadio('pae')}
Provides Audit       : ${getRadio('audit_service')}

ADDITIONAL NOTES
${val('firm_notes')}

---
Submitted via FirmMatch SG`
    );

    window.location.href = `mailto:hello.firmmatchsg@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => showSuccess('partnerForm', 'partner-success'), 1000);
  });
}
