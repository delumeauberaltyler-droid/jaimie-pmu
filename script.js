document.addEventListener('DOMContentLoaded', () => {
  
  // --- CURRENT YEAR IN FOOTER ---
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- HEADER SCROLL EFFECT ---
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- MOBILE HAMBURGER MENU ---
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');

  if (hamburger && mobileNav) {
    const toggleMenu = () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.classList.toggle('overflow-hidden');
    };

    hamburger.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
      });
    });
  }

  // --- SCROLL REVEAL ANIMATION ---
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0) {
    const revealOnScroll = () => {
      const triggerBottom = window.innerHeight * 0.85;
      
      revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
          el.classList.add('active');
        }
      });
    };
    
    // Initial call
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
  }

  // --- TESTIMONIALS SLIDER ---
  const sliderTrack = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (sliderTrack && slides.length > 0) {
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;

    // Create dots
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      if (idx === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Slide ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    const updateSlider = () => {
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, idx) => {
        if (idx === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    const goToSlide = (index) => {
      currentSlide = index;
      updateSlider();
      resetInterval();
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slideCount;
      updateSlider();
    };

    const startInterval = () => {
      slideInterval = setInterval(nextSlide, 5000);
    };

    const resetInterval = () => {
      clearInterval(slideInterval);
      startInterval();
    };

    // Initialize
    startInterval();
  }

  // --- GALLERY CATEGORY FILTER (galerie.html) ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          // If "all" is selected or item has the category class
          if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // --- LIGHTBOX FOR GALLERY (galerie.html) ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPlaceholder = document.getElementById('lightbox-placeholder');

  if (lightbox && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        // Find if this is a standard image or a slider
        const slider = item.querySelector('.comparison-slider');
        const standardImg = item.querySelector('.gallery-item-img img');

        // Clear previous content
        lightboxPlaceholder.innerHTML = '';

        if (slider) {
          // Clone slider and put into lightbox placeholder
          const clone = slider.cloneNode(true);
          lightboxPlaceholder.appendChild(clone);
        } else if (standardImg) {
          // Create a new img element
          const img = document.createElement('img');
          img.src = standardImg.src;
          img.alt = standardImg.alt;
          lightboxPlaceholder.appendChild(img);
        }

        lightbox.classList.add('active');
        document.body.classList.add('overflow-hidden');
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // --- FAQ ACCORDION (faq.html) ---
  const faqItems = document.querySelectorAll('.faq-item-acc');

  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      const content = item.querySelector('.faq-content');

      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-content').style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  // --- CONTACT FORM SUBMISSION ---
const contactForm = document.getElementById('pmu-contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      alert('Veuillez remplir tous les champs obligatoires (Nom, Email et Message).');
      return;
    }

  });
}

});
