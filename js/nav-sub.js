/**
 * nav-sub.js — Navigation injector for pages inside /pages/ directory
 * ============================================================
 * This is identical to nav.js but adjusts all href paths to
 * be relative to the /pages/ subdirectory.
 *
 * Maintenance:
 *   - Edit navigation items here AND in nav.js (root) to keep
 *     both in sync.
 *   - Always use ../ prefix for links back to root from /pages/
 * ============================================================
 */

(function () {
  'use strict';

  /* ── SHARED NAVIGATION HTML (for /pages/ sub-directory) ── */
  const navHTML = `
  <!-- EU Regulation Notice Banner -->
  <div class="alert-banner">
    🇪🇺 EUDR Compliance — Ensure your products meet EU Deforestation Regulation standards.
    <a href="library.html">Learn more &rarr;</a>
  </div>

  <!-- Sticky Site Header -->
  <header class="site-header" role="banner">
    <div class="header-inner">

      <!-- Logo: WOAT final image — links back to homepage -->
      <a href="../index.html" class="site-logo" aria-label="WOAgriTech — Home" style="display:flex;align-items:center;">
        <img
          src="../images/WOAgriTech-Logo-Official.jpg"
          alt="WOAgriTech logo"
          style="height:56px;width:auto;display:block;background:#fff;border-radius:6px;padding:3px 8px;"
          loading="eager"
        >
      </a>

      <!-- Primary Navigation -->
      <nav aria-label="Main navigation">
        <ul class="primary-nav" role="list">
          <li><a href="../index.html">Home</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="library.html">EUDR Library</a></li>
          <li><a href="news.html">News &amp; Media</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>

      <!-- Header Actions -->
      <div class="header-actions">
        <button class="theme-toggle" data-theme-toggle
                aria-label="Toggle dark mode" title="Toggle dark mode">
        </button>
        <a href="contact.html" class="btn btn-primary btn-sm">
          Get Consultation
        </a>
        <button class="nav-toggle" aria-expanded="false"
                aria-label="Open menu" aria-controls="primary-nav">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
      </div>

    </div>
  </header>`;

  /* ── SHARED FOOTER HTML (same as nav.js but relative paths for /pages/) ── */
  const footerHTML = `
  <!-- WhatsApp Chatbot Widget -->
  <div class="whatsapp-widget" role="complementary" aria-label="WhatsApp chat support">
    <div class="whatsapp-label" aria-hidden="true">Chat with us on WhatsApp</div>

    <div class="whatsapp-popup" role="dialog" aria-label="WhatsApp chat" aria-modal="true">
      <div class="wp-header">
        <div class="wp-avatar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.535 5.856L.057 23.7a.75.75 0 00.916.917l5.896-1.476A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.96 9.96 0 01-5.186-1.449l-.371-.22-3.847.963.98-3.787-.242-.391A9.96 9.96 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
          </svg>
        </div>
        <div>
          <div class="wp-name">WOAgriTech</div>
          <div class="wp-status">🟢 Typically replies within 1 hour</div>
        </div>
        <button class="wp-close" aria-label="Close chat">&times;</button>
      </div>
      <div class="wp-body">
        <div class="wp-bubble">
          <p>👋 Hello! Welcome to <strong>WOAgriTech</strong>.</p>
          <p style="margin-top:8px">We help Kenyan farmers navigate EU market regulations — EUDR, food safety standards, pesticide limits, and more.</p>
          <p style="margin-top:8px">How can we help you today?</p>
          <div class="wp-time">WOAgriTech Team · Now</div>
        </div>
      </div>
      <div class="wp-footer">
        <a href="https://wa.me/254792818278?text=Hello%20WOAgriTech%20Consult!%20I%20need%20help%20with%20EU%20market%20regulations."
           target="_blank" rel="noopener noreferrer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.535 5.856L.057 23.7a.75.75 0 00.916.917l5.896-1.476A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.96 9.96 0 01-5.186-1.449l-.371-.22-3.847.963.98-3.787-.242-.391A9.96 9.96 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>
          Start Chat on WhatsApp
        </a>
      </div>
    </div>

    <div style="position:relative">
      <button class="whatsapp-btn" aria-label="Open WhatsApp chat" aria-haspopup="dialog">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.535 5.856L.057 23.7a.75.75 0 00.916.917l5.896-1.476A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.96 9.96 0 01-5.186-1.449l-.371-.22-3.847.963.98-3.787-.242-.391A9.96 9.96 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg>
      </button>
      <div class="whatsapp-dot" aria-hidden="true">1</div>
    </div>
  </div>

  <!-- Site Footer -->
  <footer class="site-footer" role="contentinfo">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="../index.html" class="site-logo">
          <!-- Footer logo: WOAT final image -->
          <img
            src="../images/WOAgriTech-Logo-Official.jpg"
            alt="WOAgriTech logo"
            style="height:52px;width:auto;display:block;background:#fff;border-radius:6px;padding:3px 8px;"
            loading="lazy"
          >
        </a>
        <p>Empowering Kenyan farmers and exporters to meet EU market standards — EUDR compliance to food safety certifications.</p>
      </div>
      <div>
        <p class="footer-heading">Services</p>
        <ul class="footer-links" role="list">
          <li><a href="services.html#eudr">EUDR Compliance</a></li>
          <li><a href="services.html#food-safety">Food Safety Standards</a></li>
          <li><a href="services.html#certification">Product Certification</a></li>
          <li><a href="services.html#training">Farmer Training</a></li>
        </ul>
      </div>
      <div>
        <p class="footer-heading">Company</p>
        <ul class="footer-links" role="list">
          <li><a href="about.html">About Us</a></li>
          <li><a href="about.html#team">Our Team</a></li>
          <li><a href="about.html#vision">Vision &amp; Mission</a></li>
          <li><a href="news.html">News &amp; Media</a></li>
          <li><a href="library.html">EUDR Library</a></li>
        </ul>
      </div>
      <div>
        <p class="footer-heading">Contact</p>
        <div class="footer-contact-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;color:var(--color-primary)"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>Upper Hill, Nairobi, Kenya</span>
        </div>
        <div class="footer-contact-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;color:var(--color-primary)"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.46 12 19.79 19.79 0 01.36 3.43 2 2 0 012.33 1.27h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.4a16 16 0 006.29 6.29l1.2-1.2a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
          <span>+254 792 818 278</span>
        </div>
        <div class="footer-contact-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;color:var(--color-primary)"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span>info@woagritech.co.ke</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom" style="max-width:var(--content-wide);margin:0 auto">
      <p class="footer-copy">&copy; <span id="footer-year"></span> WOAgriTech Ltd. All rights reserved.</p>
      <div class="footer-social">
        <a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
        <a href="#" aria-label="X / Twitter"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
        <a href="https://wa.me/254792818278" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.535 5.856L.057 23.7a.75.75 0 00.916.917l5.896-1.476A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.96 9.96 0 01-5.186-1.449l-.371-.22-3.847.963.98-3.787-.242-.391A9.96 9.96 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/></svg></a>
      </div>
      <p class="footer-copy" style="display:flex;gap:var(--space-4)">
        <a href="#">Privacy</a><a href="#">Terms</a>
      </p>
    </div>
  </footer>`;

  /* ── INJECTION ─────────────────────────────────────────── */
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
