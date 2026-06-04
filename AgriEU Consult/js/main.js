/**
 * ============================================================
 * main.js — AgriEU Consult Global JavaScript
 * ------------------------------------------------------------
 * Handles:
 *   1. Dark/light mode toggle (persisted in sessionStorage)
 *   2. Sticky header scroll behaviour
 *   3. Mobile navigation toggle
 *   4. Scroll-reveal animations (IntersectionObserver)
 *   5. WhatsApp chat widget popup
 *   6. Active nav link highlighting
 *   7. Accordion (FAQ/Library) expand/collapse
 *   8. Smooth anchor scroll
 *   9. Animated number counters (stats)
 *
 * Maintenance: Each section is clearly labelled.
 * Do NOT inline scripts in HTML — keep all JS here.
 * ============================================================
 */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────────
   * 1. DARK / LIGHT MODE TOGGLE
   *    Reads system preference on first load.
   *    Manual toggle stored in a JS variable (not localStorage
   *    since sandboxed iframes may block that).
   * ────────────────────────────────────────────────────────── */
  const html = document.documentElement;
  let currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  // Apply initial theme
  html.setAttribute('data-theme', currentTheme);

  // Update toggle button icon to reflect current theme
  function updateThemeToggleIcon(theme) {
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    toggles.forEach(toggle => {
      toggle.setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
      toggle.innerHTML = theme === 'dark'
        // Sun icon (click to go light)
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42
                       M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
           </svg>`
        // Moon icon (click to go dark)
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
           </svg>`;
    });
  }

  updateThemeToggleIcon(currentTheme);

  // Attach click listener to all toggle buttons
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-theme-toggle]')) {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', currentTheme);
      updateThemeToggleIcon(currentTheme);
    }
  });


  /* ──────────────────────────────────────────────────────────
   * 2. STICKY HEADER SCROLL BEHAVIOUR
   *    Adds .scrolled class when page is scrolled > 20px.
   * ────────────────────────────────────────────────────────── */
  const siteHeader = document.querySelector('.site-header');

  if (siteHeader) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }, { passive: true });
  }


  /* ──────────────────────────────────────────────────────────
   * 3. MOBILE NAVIGATION TOGGLE
   *    Toggles .open class on .primary-nav.
   *    Closes when clicking outside the nav.
   * ────────────────────────────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = primaryNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close nav on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !primaryNav.contains(e.target)) {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close nav when a link is clicked
    primaryNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* ──────────────────────────────────────────────────────────
   * 4. SCROLL-REVEAL ANIMATIONS
   *    Elements with .reveal class animate in when visible.
   *    Uses IntersectionObserver for performance.
   * ────────────────────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after triggering (one-shot animation)
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,       // Trigger when 12% of element is visible
      rootMargin: '0px 0px -40px 0px'  // Slight offset from bottom
    }
  );

  // Observe all .reveal elements present at page load
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  /* ──────────────────────────────────────────────────────────
   * 5. WHATSAPP CHAT WIDGET
   *    Phone number: +254792818278
   *    Popup opens/closes on button click.
   *    "Start Chat" opens WhatsApp directly.
   * ────────────────────────────────────────────────────────── */
  const WA_NUMBER = '254792818278';  // Number without + prefix (international format)
  const WA_MESSAGE = encodeURIComponent(
    'Hello AgriEU Consult! I am a Kenyan farmer and I need help understanding EU market regulations for my products. Can you assist?'
  );

  // Build WhatsApp URL
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

  // Update all WhatsApp links
  document.querySelectorAll('[data-wa-link]').forEach(el => {
    el.href = waUrl;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });

  // Handle popup toggle
  const waBtn    = document.querySelector('.whatsapp-btn');
  const waPopup  = document.querySelector('.whatsapp-popup');
  const waClose  = document.querySelector('.wp-close');

  if (waBtn && waPopup) {
    waBtn.addEventListener('click', function (e) {
      e.preventDefault();
      waPopup.classList.toggle('open');
    });
  }

  if (waClose && waPopup) {
    waClose.addEventListener('click', function () {
      waPopup.classList.remove('open');
    });
  }

  // Close popup on outside click
  document.addEventListener('click', function (e) {
    if (waPopup && waBtn &&
        !waBtn.contains(e.target) &&
        !waPopup.contains(e.target)) {
      waPopup.classList.remove('open');
    }
  });


  /* ──────────────────────────────────────────────────────────
   * 6. ACTIVE NAV LINK HIGHLIGHTING
   *    Compares current page filename to nav href.
   * ────────────────────────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.primary-nav a').forEach(function (link) {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });


  /* ──────────────────────────────────────────────────────────
   * 7. ACCORDION (FAQ / Library)
   *    Triggers on .accordion-trigger click.
   *    Allows only one open at a time per container.
   * ────────────────────────────────────────────────────────── */
  document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const item = this.closest('.accordion-item');
      const container = item.closest('.accordion-group') || item.parentElement;
      const isOpen = item.classList.contains('open');

      // Close all siblings
      container.querySelectorAll('.accordion-item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('open', !isOpen);
      this.setAttribute('aria-expanded', (!isOpen).toString());
    });
  });


  /* ──────────────────────────────────────────────────────────
   * 8. SMOOTH ANCHOR SCROLL
   *    Native scroll-behavior: smooth is set in base.css.
   *    This JS ensures offset for sticky header.
   * ────────────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        const headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ──────────────────────────────────────────────────────────
   * 9. ANIMATED NUMBER COUNTERS
   *    Elements with data-count="<number>" animate from 0.
   *    Triggered once by IntersectionObserver.
   * ────────────────────────────────────────────────────────── */
  function animateCounter(el, target, duration) {
    const start = performance.now();
    const suffix = el.dataset.suffix || '';

    function step(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          if (!isNaN(target)) {
            animateCounter(el, target, 1800);
          }
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

})(); // End IIFE
