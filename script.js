/* =============================================
   SCRIPT.JS — 임예지 (YAZII) Portfolio
   ============================================= */

/* ---------- Intro Screen ---------- */
(function () {
  const introTyping = document.getElementById('introTypingText');
  const introTimeEl = document.getElementById('introTime');

  // 시계
  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    if (introTimeEl) introTimeEl.textContent = `${h}:${m}`;
  }
  updateClock();
  setInterval(updateClock, 10000);

  // 팝업 안 타이핑
  const introWords = ['UI/UX 디자이너', 'Product Thinker', '흐름을 먼저 보는 사람', '논리로 설계하는 사람'];
  let wi = 0, ci = 0, deleting = false;
  function introType() {
    if (!introTyping) return;
    const word = introWords[wi];
    if (!deleting) {
      introTyping.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) { deleting = true; setTimeout(introType, 1800); return; }
    } else {
      introTyping.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; wi = (wi + 1) % introWords.length; }
    }
    setTimeout(introType, deleting ? 40 : 90);
  }
  introType();
})();

/* ---------- Lenis Smooth Scroll ---------- */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* ---------- Mobile Drawer ---------- */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer  = document.getElementById('mobileDrawer');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openDrawer() {
  mobileDrawer.classList.add('open');
  mobileMenuBtn.classList.add('active');
  mobileMenuBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  mobileDrawer.classList.remove('open');
  mobileMenuBtn.classList.remove('active');
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (mobileMenuBtn && mobileDrawer) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.contains('open');
    isOpen ? closeDrawer() : openDrawer();
  });

  // 드로어 배경 클릭 시 닫기
  mobileDrawer.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) closeDrawer();
  });

  // 메뉴 링크 클릭 시 닫기
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ---------- Typing Animation ---------- */
const typingEl = document.getElementById('typingText');
const words = ['UI/UX 디자이너', '제품을 설계하는 사람', '논리로 그리는 사람', '흐름을 먼저 보는 사람'];
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;
const TYPING_SPEED  = 80;
const DELETING_SPEED = 45;
const PAUSE_AFTER   = 1800;

function type() {
  if (!typingEl) return;
  const word = words[wordIdx];

  if (!isDeleting) {
    typingEl.textContent = word.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === word.length) {
      isDeleting = true;
      setTimeout(type, PAUSE_AFTER);
      return;
    }
  } else {
    typingEl.textContent = word.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
    }
  }
  setTimeout(type, isDeleting ? DELETING_SPEED : TYPING_SPEED);
}

type();

/* ---------- Back to Top ---------- */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (!backToTopBtn) return;
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}, { passive: true });

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    lenis.scrollTo(0, { duration: 1.4 });
  });
}

/* ---------- Testimonials (Peer Reviews) ---------- */
const testimonialTextEl   = document.getElementById('current-testimonial-text');
const testimonialAuthorEl = document.getElementById('current-testimonial-author');
const clientCards = document.querySelectorAll('.testimonial-client-card');

clientCards.forEach((card) => {
  card.addEventListener('click', () => {
    const text = card.dataset.text;
    const name = card.dataset.name;
    const role = card.dataset.role;
    if (!testimonialTextEl || !testimonialAuthorEl) return;

    // 텍스트 교체 (fade 효과)
    testimonialTextEl.style.opacity = '0';
    testimonialAuthorEl.style.opacity = '0';

    setTimeout(() => {
      testimonialTextEl.textContent = text;
      testimonialAuthorEl.innerHTML = `<strong>${name}</strong><span>${role}</span>`;
      testimonialTextEl.style.opacity = '1';
      testimonialAuthorEl.style.opacity = '1';
    }, 180);

    // active 상태 업데이트
    clientCards.forEach((c) => {
      c.classList.remove('active');
      c.setAttribute('aria-pressed', 'false');
    });
    card.classList.add('active');
    card.setAttribute('aria-pressed', 'true');
  });
});

// quote card text에 transition 추가
if (testimonialTextEl) {
  testimonialTextEl.style.transition = 'opacity 0.18s ease';
}
if (testimonialAuthorEl) {
  testimonialAuthorEl.style.transition = 'opacity 0.18s ease';
}

/* ---------- FAQ Accordion ---------- */
const faqItems = document.querySelectorAll('.faq-chat-item');

faqItems.forEach((item) => {
  const btn = item.querySelector('.faq-question-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    faqItems.forEach((fi) => {
      fi.classList.remove('open');
      const b = fi.querySelector('.faq-question-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });

    // Toggle clicked
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ---------- Contact Form ---------- */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.submit-btn');
    if (btn) {
      btn.textContent = 'Sending…';
      btn.disabled = true;
    }

    // 실제 전송 로직 자리 (Formspree 등 연동 시 교체)
    await new Promise((r) => setTimeout(r, 1200));

    if (btn) {
      btn.textContent = 'Sent ✓';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        contactForm.reset();
      }, 2500);
    }
  });
}
