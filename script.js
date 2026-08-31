// ===============================================
// PORTFOLIO INTERACTIONS
// ===============================================

// Testimonial Switcher
const testimonialData = {
  1: {
    text: "예지님은 단순히 화면을 그리는 것을 넘어, 정보의 맥락과 컴포넌트 확장성을 깊이 고민합니다. 왜 이렇게 설계했는지 근거가 명확하여 팀 전체의 작업 효율이 크게 높아졌습니다.",
    author: "Marcus Chen",
    title: "Product Lead | Tech Studio"
  },
  2: {
    text: "추상적인 기획 아이디어를 체계적인 디자인 시스템과 UI 구조로 정리하는 역량이 탁월합니다. 개발팀과의 커뮤니케이션도 매우 명쾌합니다.",
    author: "Emma Reed",
    title: "Product Designer | System Labs"
  },
  3: {
    text: "브랜드가 지닌 고유의 메시지와 논리를 사용자 경험 속에 자연스럽게 스며들도록 설계하는 디자이너입니다. 함께 일하며 큰 영감을 받았습니다.",
    author: "Lila Martinez",
    title: "Brand Strategist | Collective"
  },
  4: {
    text: "컴포넌트 설계와 토큰 구조가 워낙 탄탄해서 프론트엔드로 옮길 때 후반 수정 소요가 획기적으로 줄었습니다. 진짜 논리를 아는 디자이너입니다.",
    author: "Theo Walker",
    title: "Lead Frontend Engineer | Urban Labs"
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
        // Update active card
        clientCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        // Update testimonial content with fade effect
        testimonialText.style.opacity = '0';
        testimonialAuthor.style.opacity = '0';
        
        setTimeout(() => {
          testimonialText.textContent = data.text;
          testimonialAuthor.innerHTML = `<strong>${data.author}</strong><span>${data.title}</span>`;
          testimonialText.style.opacity = '1';
          testimonialAuthor.style.opacity = '1';
        }, 200);
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
  const words = ['UI/UX designer', 'Product thinker', 'Information architect', 'Curious builder'];
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

console.log('✦ Aurorix Portfolio Interactions Loaded');

