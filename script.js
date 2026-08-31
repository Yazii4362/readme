// ===============================================
// PORTFOLIO INTERACTIONS
// ===============================================

// Testimonial Switcher
const testimonialData = {
  1: {
    text: "화면보다 맥락을 먼저 봅니다. 브랜드가 무슨 말을 해야 하는지, 사용자가 어디서 막히는지 — 그 질문에서 디자인을 시작합니다.",
    author: "맥락이 먼저",
    title: "Context before screens"
  },
  2: {
    text: "예쁜 걸 고르기 전에, 이 브랜드가 어떤 사람에게 어떻게 보여야 하는지를 먼저 설정합니다. UX와 브랜딩은 연결된다고 생각합니다.",
    author: "논리로 보기",
    title: "Brand as logic, not vibe"
  },
  3: {
    text: "컬러 시스템, 파일 구조, 브랜드 아이덴티티 — 왜 이렇게 설계해야 하는지 납득하고 넘어갑니다. 느려 보이지만, 나중에 흔들리지 않는 결과물을 만드는 방식입니다.",
    author: "기반 쌓기",
    title: "Foundations that don't shake"
  },
  4: {
    text: "Clarity is kindness. 예쁜 화면도 좋지만, 왜 이 버튼이 여기 있어야 하는지 설명할 수 있는 디자인을 합니다.",
    author: "Clarity",
    title: "Clarity is kindness"
  }
};

const clientCards = document.querySelectorAll('.testimonial-client-card');
const testimonialText = document.getElementById('current-testimonial-text');
const testimonialAuthor = document.getElementById('current-testimonial-author');

if (clientCards.length > 0 && testimonialText && testimonialAuthor) {
  clientCards.forEach(card => {
    card.addEventListener('click', () => {
      const testimonialId = card.dataset.testimonial;
      const data = testimonialData[testimonialId];
      
      if (data) {
        clientCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        testimonialText.style.opacity = '0';
        testimonialAuthor.style.opacity = '0';
        
        setTimeout(() => {
          testimonialText.textContent = data.text;
          testimonialAuthor.innerHTML = `<strong>${data.author}</strong><span>${data.title}</span>`;
          testimonialText.style.opacity = '1';
          testimonialAuthor.style.opacity = '1';
        }, 200);

        const quoteCard = document.querySelector('.testimonial-quote-card');
        if (quoteCard && window.matchMedia('(max-width: 1100px)').matches) {
          quoteCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  });
}

// Add fade transition styles
if (testimonialText && testimonialAuthor) {
  testimonialText.style.transition = 'opacity 0.3s ease';
  testimonialAuthor.style.transition = 'opacity 0.3s ease';
}

// FAQ Chat Bubbles
const faqItems = document.querySelectorAll('.faq-chat-item');

faqItems.forEach(item => {
  const btn = item.querySelector('.faq-question-btn');
  
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    
    // Close all others
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('open');
      }
    });
    
    // Toggle current
    item.classList.toggle('open');
  });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate submission
    setTimeout(() => {
      submitBtn.innerHTML = '✓ Sent!';
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2000);
    }, 1500);
  });
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileMenuBtn && mobileDrawer) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.remove('open');
      mobileMenuBtn.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      mobileDrawer.classList.add('open');
      mobileMenuBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close when clicking outside inner content
  mobileDrawer.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) {
      mobileDrawer.classList.remove('open');
      mobileMenuBtn.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close when clicking a nav link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      mobileMenuBtn.classList.remove('active');
      document.body.style.overflow = '';
    } );
  });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// Active Nav Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav-link');

function updateActiveNav() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Typewriter Effect for Hero
const typingElement = document.getElementById('typingText');
if (typingElement) {
  const words = ['UI/UX designer', 'Product designer', 'systems thinker', 'Curious builder'];
  let wordIndex = 0;
  let charIndex = words[0].length;
  let isDeleting = true;
  let typeSpeed = 80;

  function typeLoop() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 45;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2200; // Pause after word is fully typed
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeLoop, typeSpeed);
  }

  // Start after initial view
  setTimeout(typeLoop, 2000);
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

console.log('✦ Yazii Im — UI/UX Designer Portfolio');

