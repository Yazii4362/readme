// =========================================================
// AURORIX-INSPIRED PORTFOLIO - INTERACTION SCRIPT
// =========================================================

// ---------- 1. INTERSECTION OBSERVER (REVEAL ANIMATIONS) ----------
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ---------- 2. MOBILE MENU TOGGLE ----------
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.textContent = isOpen ? 'CLOSE' : 'MENU';
  });

  // Close menu when clicking a link
  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = 'MENU';
    });
  });
}

// ---------- 3. COLLABORATORS / TESTIMONIALS SWITCHER ----------
const avatarItems = document.querySelectorAll('.avatar-item');
const testimonialContents = document.querySelectorAll('.testimonial-content');

avatarItems.forEach((avatar) => {
  avatar.addEventListener('click', () => {
    const targetPerson = avatar.dataset.target;

    // Remove active class from all avatars
    avatarItems.forEach((item) => item.classList.remove('active'));

    // Add active class to clicked avatar
    avatar.classList.add('active');

    // Hide all testimonials
    testimonialContents.forEach((content) => {
      content.classList.remove('active');
    });

    // Show target testimonial
    const targetTestimonial = document.querySelector(
      `.testimonial-content[data-person="${targetPerson}"]`
    );
    if (targetTestimonial) {
      targetTestimonial.classList.add('active');
    }
  });
});

// ---------- 4. FAQ ACCORDION ----------
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const question = item.querySelector('.faq-question');
  const plus = item.querySelector('.faq-plus');

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all other items
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove('open');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        otherItem.querySelector('.faq-plus').textContent = '+';
      }
    });

    // Toggle current item
    item.classList.toggle('open');
    question.setAttribute('aria-expanded', !isOpen);
    plus.textContent = isOpen ? '+' : '−';
  });
});

// ---------- 5. EXPERIENCE PREVIEW ----------
const experienceRows = document.querySelectorAll('.experience-row');

experienceRows.forEach((row) => {
  const previewId = row.dataset.preview;
  const previewCard = document.getElementById(previewId);

  if (previewCard) {
    row.addEventListener('mouseenter', () => {
      document.querySelectorAll('.preview-card').forEach((card) => {
        card.classList.remove('active');
      });
      previewCard.classList.add('active');
    });
  }
});

// ---------- 6. CUSTOM CURSOR ----------
const cursor = document.querySelector('.custom-cursor');

if (cursor && window.innerWidth > 760) {
  document.body.classList.add('cursor-ready');

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    cursorX += dx * 0.15;
    cursorY += dy * 0.15;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Add hover effect for links and buttons
  const interactiveElements = document.querySelectorAll('a, button, .project-link, .avatar-item');

  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-link');
    });

    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-link');
    });
  });
}

// ---------- 7. ACTIVE NAV LINK ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.side-nav a, .mobile-nav a');

function updateActiveNav() {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ---------- 8. SMOOTH SCROLL ----------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#top') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// ---------- 9. FORM SUBMISSION ----------
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;

    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.disabled = true;

    // Simulate form submission (replace with actual implementation)
    setTimeout(() => {
      submitButton.innerHTML = '<span>✓ Sent!</span>';

      setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        contactForm.reset();
      }, 2000);
    }, 1500);
  });
}

// ---------- 10. REDUCE MOTION SUPPORT ----------
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.scrollBehavior = 'auto';
  revealElements.forEach((el) => el.classList.add('in-view'));
}

console.log('✦ Portfolio initialized');
