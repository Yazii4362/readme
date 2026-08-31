// ===============================================
// PORTFOLIO INTERACTIONS
// ===============================================

// Testimonial Switcher
const testimonialData = {
  1: {
    text: "Working with Aurora transformed our brand—her strategic, artistic designs crafted a resonant visual story that boosted customer loyalty by 40% in six months. Her blend of strategy and artistry is unmatched.",
    author: "Marcus Chen",
    title: "CEO | Nexus Tech"
  },
  2: {
    text: "Aurora's creative vision and attention to detail brought our brand identity to life in ways we never imagined. Her work is both beautiful and strategically sound.",
    author: "Emma Reed",
    title: "Marketing Director | Bloom Co"
  },
  3: {
    text: "Her ability to translate complex brand strategies into stunning visual narratives is exceptional. Aurora doesn't just design—she creates experiences that connect.",
    author: "Lila Martinez",
    title: "Founder | Artisan Collective"
  },
  4: {
    text: "Collaborating with Aurora was transformative. She understood our vision immediately and delivered designs that exceeded all expectations. A true creative partner.",
    author: "Theo Walker",
    title: "Creative Director | Urban Labs"
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
  const words = ['graphic designer', 'brand strategist', 'UI/UX thinker', 'creative builder'];
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

