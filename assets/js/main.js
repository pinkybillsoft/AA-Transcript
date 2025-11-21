// ============================================
// AA TRANSCRIPT - MODERN NAVIGATION & INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // Mobile Menu Toggle
  // ============================================
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const body = document.body;
  
  if (burger && menu) {
    burger.addEventListener('click', function() {
      menu.classList.toggle('open');
      burger.classList.toggle('active');
      body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!burger.contains(e.target) && !menu.contains(e.target) && menu.classList.contains('open')) {
        menu.classList.remove('open');
        burger.classList.remove('active');
        body.style.overflow = '';
      }
    });
    
    // Close menu when clicking on a link
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        menu.classList.remove('open');
        burger.classList.remove('active');
        body.style.overflow = '';
      });
    });
  }
  
  // ============================================
  // Navbar Scroll Effect
  // ============================================
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      // Add shadow when scrolled
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }
  
  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or "#top"
      if (href === '#' || href === '#top') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // Offset for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ============================================
  // Intersection Observer for Fade-in Animations
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements with fade-in class
  const fadeElements = document.querySelectorAll('.service-card, .trust-item, .about-section, .contact-card');
  fadeElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(el);
  });
  
  // ============================================
  // Back to Top Button Functionality
  // ============================================
  const backToTopLinks = document.querySelectorAll('.back-to-top');
  
  backToTopLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
  
  // ============================================
  // Form Validation (if forms exist)
  // ============================================
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'var(--color-error)';
          
          setTimeout(() => {
            input.style.borderColor = '';
          }, 3000);
        }
      });
      
      if (!isValid) {
        e.preventDefault();
      }
    });
  });
  
  // ============================================
  // Dynamic Year in Footer
  // ============================================
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
  
  // ============================================
  // Card Hover Effects Enhancement
  // ============================================
  const cards = document.querySelectorAll('.card, .service-card, .trust-item, .contact-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
  
  // ============================================
  // Loading Animation (optional)
  // ============================================
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger any entrance animations
    const heroElements = document.querySelectorAll('.hero h1, .hero-subtitle, .hero-cta');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });
  });
  
  // ============================================
  // Prevent FOUC (Flash of Unstyled Content)
  // ============================================
  document.documentElement.style.visibility = 'visible';
  
});

// ============================================
// Utility Functions
// ============================================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}