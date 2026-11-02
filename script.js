// =========================================================
// DYMAS ALFIN — Interactive Portfolio Script
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Copy Email to Clipboard
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyText = document.getElementById('copyText');

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email') || 'bilalaurangzaib664@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        copyText.textContent = 'Copied to Clipboard! ✓';
        copyBtn.style.backgroundColor = '#10b981';
        copyBtn.style.color = '#ffffff';
        copyBtn.style.borderColor = '#10b981';

        setTimeout(() => {
          copyText.textContent = 'Copy Email';
          copyBtn.style.backgroundColor = '';
          copyBtn.style.color = '';
          copyBtn.style.borderColor = '';
        }, 2200);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        copyText.textContent = 'Copied! ✓';
        setTimeout(() => {
          copyText.textContent = 'Copy Email';
        }, 2200);
      }
    });
  }

  // 2. Interactive Work Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Load More Projects Simulation
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      loadMoreBtn.innerHTML = `<span>Loading projects archive...</span>`;
      loadMoreBtn.disabled = true;

      setTimeout(() => {
        loadMoreBtn.innerHTML = `<span>All 4 Projects Loaded ✓</span>`;
        loadMoreBtn.style.backgroundColor = '#10b981';
        loadMoreBtn.style.color = '#ffffff';
        loadMoreBtn.style.borderColor = '#10b981';
      }, 1000);
    });
  }

  const workCarousel = document.getElementById('workCarousel');
  if (workCarousel) {
    const previousButton = document.querySelector('[data-work-direction="previous"]');
    const nextButton = document.querySelector('[data-work-direction="next"]');
    const updateWorkCarouselControls = () => {
      const maxScroll = workCarousel.scrollWidth - workCarousel.clientWidth;
      if (previousButton) previousButton.disabled = workCarousel.scrollLeft <= 1;
      if (nextButton) nextButton.disabled = workCarousel.scrollLeft >= maxScroll - 1;
    };
    const scrollWorkCarousel = (direction) => {
      const card = workCarousel.querySelector('.skill-card');
      if (!card) return;
      const grid = workCarousel.querySelector('.skills-grid');
      const gap = grid ? parseFloat(getComputedStyle(grid).columnGap) || 0 : 0;
      workCarousel.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: 'smooth' });
    };

    previousButton?.addEventListener('click', () => scrollWorkCarousel(-1));
    nextButton?.addEventListener('click', () => scrollWorkCarousel(1));
    workCarousel.addEventListener('scroll', updateWorkCarouselControls, { passive: true });
    window.addEventListener('resize', updateWorkCarouselControls);
    updateWorkCarouselControls();
  }

  // 4. Contact Form Submission Simulation
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('userName').value.trim();
      
      formFeedback.textContent = `Thank you, ${name}! Your project inquiry has been received. I'll get back to you within 24 hours.`;
      formFeedback.className = 'form-feedback success';
      contactForm.reset();

      setTimeout(() => {
        formFeedback.style.display = 'none';
      }, 6000);
    });
  }

  // 5. Subtle Interactive Mouse Hover Tilt on Hero Stage (Desktop only)
  const heroStage = document.querySelector('.hero-stage');
  const typography = document.querySelector('.hero-typography');
  const portrait = document.querySelector('.portrait-wrapper');

  if (heroStage && typography && portrait && window.innerWidth > 992) {
    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Subtle parallax shift
      typography.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;
      portrait.style.transform = `translateX(calc(-50% + ${x * -0.015}px))`;
    });

    heroStage.addEventListener('mouseleave', () => {
      typography.style.transform = 'translate(0px, 0px)';
      portrait.style.transform = 'translateX(-50%)';
    });
  }

  // 6. Global Lazy Loading & Scroll Reveal Observer
  const lazyElements = document.querySelectorAll('.lazy-reveal');
  
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    lazyElements.forEach(el => lazyObserver.observe(el));
  } else {
    // Fallback for older browsers
    lazyElements.forEach(el => el.classList.add('is-visible'));
  }

  // 7. Global Page Transition Animation Across Every Page/Section
  const curtain = document.getElementById('pageCurtain');
  const curtainTarget = document.getElementById('curtainTarget');
  const progressBar = document.getElementById('pageProgress');

  if (window.__portfolioHomeReload && curtainTarget) {
    curtainTarget.textContent = 'HOME';
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Friendly label shown inside the curtain for each destination
  const pageLabels = {
    '#home': 'HOME',
    '#work': 'WORK [4]',
    '#service': 'SERVICE [4]',
    '#experience': 'EXPERIENCE [4Y+]',
    '#contact': 'CONTACT'
  };

  // --- Top scroll progress line ---
  const updateProgress = () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollable > 0 ? (scrollTop / scrollable) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  // --- Curtain transition between pages ---
  let isTransitioning = false;

  const runTransition = (targetSelector, label) => {
    const target = document.querySelector(targetSelector);
    if (!target || !curtain) return;

    isTransitioning = true;

    if (prefersReducedMotion) {
      target.scrollIntoView();
      isTransitioning = false;
      return;
    }

    if (curtainTarget) curtainTarget.textContent = label;

    // Restart the animation cleanly
    curtain.classList.remove('is-active');
    void curtain.offsetWidth;
    curtain.classList.add('is-active');

    // Swap the actual page while the curtain fully covers the viewport
    setTimeout(() => {
      const previousBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      target.scrollIntoView({ block: 'start' });
      document.documentElement.style.scrollBehavior = previousBehavior;
      updateProgress();
    }, 420);

    // Release the curtain once the sweep completes
    setTimeout(() => {
      curtain.classList.remove('is-active');
      isTransitioning = false;
    }, 1100);
  };

  // Intercept every internal anchor link (nav, scroll cue, footer, service links...)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#' || !document.querySelector(hash)) return;

      e.preventDefault();
      if (isTransitioning) return;

      const label = pageLabels[hash] || link.textContent.trim().replace(/\s+/g, ' ').toUpperCase();
      runTransition(hash, label);
    });
  });

  // Initial page load reveal (the "home" page transition)
  if (curtain && !prefersReducedMotion) {
    curtain.classList.add('is-entering');
    setTimeout(() => curtain.classList.remove('is-entering'), 900);
  }
});
