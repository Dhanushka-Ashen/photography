/* ==========================================================================
   Dhanushka Ashen Photography - Interactive Script
   Includes Hero Slideshow, Scroll Animations & Direct WhatsApp Booking
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Dhanushka's verified WhatsApp phone number (Sri Lanka +94)
  const PHOTOGRAPHER_PHONE = "94781300607";

  // --- Navigation & Mobile Menu ---
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');

  // Sticky Navbar on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking nav item
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Hero Slideshow Carousel ---
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentSlideIndex = 0;
  let slideInterval = null;

  function goToSlide(index) {
    if (heroSlides.length === 0) return;
    
    // Remove active from current
    heroSlides[currentSlideIndex].classList.remove('active');
    if (heroDots[currentSlideIndex]) {
      heroDots[currentSlideIndex].classList.remove('active');
    }

    // Set new active
    currentSlideIndex = (index + heroSlides.length) % heroSlides.length;
    heroSlides[currentSlideIndex].classList.add('active');
    if (heroDots[currentSlideIndex]) {
      heroDots[currentSlideIndex].classList.add('active');
    }
  }

  function nextSlide() {
    goToSlide(currentSlideIndex + 1);
  }

  function startSlideTimer() {
    stopSlideTimer();
    slideInterval = setInterval(nextSlide, 5500); // changes every 5.5 seconds
  }

  function stopSlideTimer() {
    if (slideInterval) clearInterval(slideInterval);
  }

  // Dot click listeners
  heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      startSlideTimer(); // reset timer on manual click
    });
  });

  // Start auto slideshow
  if (heroSlides.length > 0) {
    startSlideTimer();
  }

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Reveal once
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- Portfolio Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --- Fullscreen Lightbox Modal ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxMeta = document.getElementById('lightboxMeta');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentVisibleCards = [];
  let currentLightboxIndex = 0;

  function updateVisibleCards() {
    currentVisibleCards = Array.from(portfolioCards).filter(
      card => card.style.display !== 'none'
    );
  }

  function openLightbox(index) {
    updateVisibleCards();
    if (currentVisibleCards.length === 0) return;

    currentLightboxIndex = index;
    const card = currentVisibleCards[currentLightboxIndex];
    const imgEl = card.querySelector('img');
    const title = card.querySelector('.card-title')?.innerText || 'Photograph';
    const category = card.querySelector('.card-category')?.innerText || 'Portfolio';
    const details = card.querySelector('.card-details span')?.innerText || '';

    lightboxImg.src = imgEl.getAttribute('data-full') || imgEl.src;
    lightboxImg.alt = title;
    lightboxTitle.innerText = title;
    lightboxMeta.innerText = `${category} • ${details}`;

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNextImage() {
    updateVisibleCards();
    if (currentVisibleCards.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % currentVisibleCards.length;
    openLightbox(currentLightboxIndex);
  }

  function showPrevImage() {
    updateVisibleCards();
    if (currentVisibleCards.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + currentVisibleCards.length) % currentVisibleCards.length;
    openLightbox(currentLightboxIndex);
  }

  // Attach click listener to portfolio cards
  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      updateVisibleCards();
      const index = currentVisibleCards.indexOf(card);
      if (index !== -1) {
        openLightbox(index);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

  // Close when clicking modal backdrop
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });

  // --- Animated Numbers Counter ---
  const statsSection = document.querySelector('.hero-stats');
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  if (statsSection && statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target') || '0', 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1800;
          const stepTime = 20;
          const step = Math.ceil(target / (duration / stepTime));

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              stat.innerText = target + suffix;
              clearInterval(timer);
            } else {
              stat.innerText = count + suffix;
            }
          }, stepTime);
        });
      }
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }

  // --- Booking Form: Direct WhatsApp Submission ---
  const bookingForm = document.getElementById('bookingForm');
  const formFeedback = document.getElementById('formFeedback');
  const whatsappDirectBtn = document.getElementById('whatsappDirectBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const email = document.getElementById('clientEmail').value.trim();
      const shootType = document.getElementById('shootType').value;
      const eventDate = document.getElementById('eventDate').value;
      const message = document.getElementById('clientMessage').value.trim();

      if (!name || !phone) {
        alert('Please provide your name and phone number so Dhanushka can contact you.');
        return;
      }

      // Format clean, professional WhatsApp message
      const whatsappText = encodeURIComponent(
        `📸 *NEW INQUIRY - Dhanushka Ashen Photography*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Client Name:* ${name}\n` +
        `📱 *Phone / WhatsApp:* ${phone}\n` +
        `✉️ *Email:* ${email || 'Not specified'}\n` +
        `💍 *Shoot Type:* ${shootType}\n` +
        `🗓️ *Event Date:* ${eventDate || 'To be decided'}\n` +
        `📝 *Vision / Notes:*\n${message || 'Looking forward to discussing the package!'}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `Sent via Dhanushka Ashen Photography Website`
      );

      const whatsappUrl = `https://wa.me/${PHOTOGRAPHER_PHONE}?text=${whatsappText}`;

      // In-page feedback
      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `
          <strong>✨ Message Prepared Successfully!</strong><br>
          Opening WhatsApp directly with your details for Dhanushka Ashen...
        `;
        formFeedback.style.display = 'block';
      }

      // Directly open WhatsApp with prefilled message!
      window.open(whatsappUrl, '_blank');

      // Clear the form
      bookingForm.reset();
    });
  }

  // Direct WhatsApp Floating / Action Button
  if (whatsappDirectBtn) {
    whatsappDirectBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const defaultText = encodeURIComponent(
        `Hello Dhanushka Ashen! I visited your website and would like to check your availability for a photography session.`
      );
      window.open(`https://wa.me/${PHOTOGRAPHER_PHONE}?text=${defaultText}`, '_blank');
    });
  }

  // Smooth scroll for internal navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- Testimonials Carousel ---
  const testiSlides = document.querySelectorAll('.testi-slide');
  const testiDots   = document.querySelectorAll('.testi-dot');
  const testiPrev   = document.getElementById('testiPrev');
  const testiNext   = document.getElementById('testiNext');
  let testiCurrent  = 0;
  let testiTimer    = null;

  function goToTesti(index) {
    if (testiSlides.length === 0) return;
    testiSlides[testiCurrent].classList.remove('active');
    testiDots[testiCurrent] && testiDots[testiCurrent].classList.remove('active');
    testiCurrent = (index + testiSlides.length) % testiSlides.length;
    testiSlides[testiCurrent].classList.add('active');
    testiDots[testiCurrent] && testiDots[testiCurrent].classList.add('active');
  }

  function startTestiAuto() {
    clearInterval(testiTimer);
    testiTimer = setInterval(() => goToTesti(testiCurrent + 1), 5000);
  }

  if (testiSlides.length > 0) {
    // Arrow buttons
    testiPrev && testiPrev.addEventListener('click', () => { goToTesti(testiCurrent - 1); startTestiAuto(); });
    testiNext && testiNext.addEventListener('click', () => { goToTesti(testiCurrent + 1); startTestiAuto(); });

    // Dot clicks
    testiDots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToTesti(i); startTestiAuto(); });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const section = document.getElementById('testimonials');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (e.key === 'ArrowLeft')  { goToTesti(testiCurrent - 1); startTestiAuto(); }
        if (e.key === 'ArrowRight') { goToTesti(testiCurrent + 1); startTestiAuto(); }
      }
    });

    // Touch swipe support
    const carousel = document.getElementById('testiCarousel');
    if (carousel) {
      let touchStartX = 0;
      carousel.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
      carousel.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) { goToTesti(dx < 0 ? testiCurrent + 1 : testiCurrent - 1); startTestiAuto(); }
      });
    }

    // Pause on hover
    const wrapper = document.querySelector('.testi-carousel-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', () => clearInterval(testiTimer));
      wrapper.addEventListener('mouseleave', startTestiAuto);
    }

    startTestiAuto();
  }
});
