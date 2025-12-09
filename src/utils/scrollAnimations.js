// Scroll-based animation utility for all sections
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Initialize Intersection Observer for scroll animations
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with scroll-animate class
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach(element => {
      this.observer.observe(element);
    });

    // Observe specific section elements for staggered animations
    this.observeSectionElements();
    
    // Handle scroll events for performance optimization
    this.setupScrollHandler();
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Add staggered animations for child elements
        if (entry.target.classList.contains('stagger-children')) {
          this.addStaggeredAnimations(entry.target);
        }
      }
    });
  }

  observeSectionElements() {
    // Observe hero section elements
    const heroElements = document.querySelectorAll('.hero h1, .hero .hero-description, .intro h1, .intro .hero-description');
    heroElements.forEach(element => {
      if (!element.classList.contains('scroll-animate')) {
        element.classList.add('scroll-animate', 'fade-up');
        this.observer.observe(element);
      }
    });

    // Observe about section elements
    const aboutElements = document.querySelectorAll('.text-content h2, .bio, .metadata, .links');
    aboutElements.forEach(element => {
      if (!element.classList.contains('scroll-animate')) {
        element.classList.add('scroll-animate', 'fade-up');
        this.observer.observe(element);
      }
    });

    // Observe skills section elements
    const skillsElements = document.querySelectorAll('.skills h2, .skill-node, .skill-name, .skill-desc');
    skillsElements.forEach((element, index) => {
      if (!element.classList.contains('scroll-animate')) {
        element.classList.add('scroll-animate', 'fade-up');
        // Add stagger delay for skill nodes
        if (element.classList.contains('skill-node')) {
          const delay = (index * 0.1) + 0.1;
          element.style.animationDelay = `${delay}s`;
        }
        this.observer.observe(element);
      }
    });
  }

  addStaggeredAnimations(container) {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
      if (!child.classList.contains('scroll-animate')) {
        child.classList.add('scroll-animate', 'stagger-fade');
        child.style.animationDelay = `${(index + 1) * 0.1}s`;
        this.observer.observe(child);
      }
    });
  }

  setupScrollHandler() {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Update any elements that should be animated based on scroll position
          this.updateScrollBasedElements();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', this.debounce(() => {
      // Re-observe elements on resize
      this.observer.disconnect();
      this.init();
    }, 250));
  }

  updateScrollBasedElements() {
    // Update elements based on scroll position for additional effects
    const scrollPosition = window.scrollY + window.innerHeight;
    
    document.querySelectorAll('.scroll-animate').forEach(element => {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      
      if (scrollPosition > elementTop + 100 && !element.classList.contains('animate-in')) {
        element.classList.add('animate-in');
      }
    });
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Method to manually trigger animations (useful for dynamic content)
  triggerAnimations() {
    const elements = document.querySelectorAll('.scroll-animate:not(.animate-in)');
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        element.classList.add('animate-in');
      }
    });
  }

  // Cleanup method
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    window.removeEventListener('scroll', this.handleScroll);
  }
}

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.scrollAnimations = new ScrollAnimations();
});

// Export for use in React components if needed
export default ScrollAnimations;