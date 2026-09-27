const NAV_HTML = `
<nav class="nav" id="navbar">
  <div class="container nav-inner">
    <a href="index.html" class="nav-logo">
      <img src="mh-logo.png" alt="MH Modern Highline"/>
    </a>
    <button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
    <ul class="nav-menu" id="nav-menu">
      <li><a href="index.html">Home</a></li>
      <li>
        <a href="about.html">Company ▾</a>
        <div class="dropdown">
          <a href="about.html">About Us</a>
          <a href="about.html#team">Meet the Founders</a>
          <a href="quality.html">Quality Assurance</a>
          <a href="quality.html#iso">ISO Certifications</a>
          <a href="quality.html#testing">Product Testing</a>
        </div>
      </li>
      <li><a href="products.html">Products</a></li>
      <li><a href="industries.html">Industries</a></li>
      <li>
        <a href="gallery.html">Gallery ▾</a>
        <div class="dropdown">
          <a href="gallery.html">Photo Gallery</a>
          <a href="gallery.html#video">Video Gallery</a>
        </div>
      </li>
      <li>
        <a href="media.html">Media Center ▾</a>
        <div class="dropdown">
          <a href="media.html">News & Articles</a>
          <a href="media.html#faq">FAQ</a>
        </div>
      </li>
      <li><a href="careers.html">Careers</a></li>
      <li><a href="contact.html" class="nav-contact-btn">Contact Us</a></li>
      <li><a href="mh-dashboard.html" class="nav-signin-btn">Client Portal</a></li>
    </ul>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">
          <img src="mh-logo.png" alt="MH Modern Highline"/>
        </div>
        <p class="tagline">Specialized in manufacturing automotive brake hoses, fuel pipes, hydraulic hoses, and industrial piping systems with high quality standards and traceability systems.</p>
      </div>
      <div>
        <h5>Company</h5>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="about.html#team">Meet the Founders</a></li>
          <li><a href="quality.html">Quality Assurance</a></li>
          <li><a href="gallery.html">Gallery</a></li>
          <li><a href="careers.html">Careers</a></li>
        </ul>
      </div>
      <div>
        <h5>Products</h5>
        <ul>
          <li><a href="products.html">All Products</a></li>
          <li><a href="industries.html">Industries</a></li>
          <li><a href="media.html">Media Center</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h5>Contact</h5>
        <p>Industrial Unit No: E7, Ebdaa Complex<br/>Plot 12, Industrial Zone<br/>10th of Ramadan City, Egypt</p>
        <p style="margin-top:0.75rem;"><a href="tel:+201120882928">+20 11 2088 2928</a></p>
        <p><a href="mailto:info@mhhose.com">info@mhhose.com</a></p>
        <p style="margin-top:0.5rem;"><a href="https://www.linkedin.com/company/mh-modern-highline/" target="_blank">LinkedIn ↗</a></p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 MH Modern Highline. All rights reserved.</p>
      <span class="footer-cert">IATF 16949:2016 · ISO 9001:2015 · Certificate TS/1209/25</span>
    </div>
  </div>
</footer>
<a href="https://wa.me/201120882928" class="whatsapp-btn" target="_blank" title="WhatsApp Us">💬</a>
<button class="scroll-top" id="scrollTop" aria-label="Scroll to top">↑</button>`;

document.addEventListener('DOMContentLoaded', () => {
  // Inject nav
  const navHolder = document.getElementById('nav-placeholder');
  if (navHolder) navHolder.outerHTML = NAV_HTML;

  // Inject footer
  const footerHolder = document.getElementById('footer-placeholder');
  if (footerHolder) footerHolder.outerHTML = FOOTER_HTML;

  // Active nav link
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu > li > a').forEach(a => {
    if (a.getAttribute('href') === page) a.parentElement.classList.add('active');
  });

  // Hamburger toggle
  const burger = document.getElementById('hamburger');
  const menu = document.getElementById('nav-menu');
  if (burger && menu) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !burger.contains(e.target)) {
        menu.classList.remove('open');
        document.querySelectorAll('.nav-menu > li').forEach(li => li.classList.remove('open'));
      }
    });

    // Mobile dropdown toggles
    document.querySelectorAll('.nav-menu > li > a').forEach(a => {
      a.addEventListener('click', (e) => {
        if (window.innerWidth < 960) {
          const li = a.parentElement;
          const dropdown = li.querySelector('.dropdown');
          if (dropdown) {
            e.preventDefault();
            const isOpen = li.classList.contains('open');
            document.querySelectorAll('.nav-menu > li').forEach(l => l.classList.remove('open'));
            if (!isOpen) li.classList.add('open');
          } else {
            menu.classList.remove('open');
          }
        }
      });
    });

    // Close menu on dropdown link click (mobile)
    document.querySelectorAll('.dropdown a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth < 960) {
          menu.classList.remove('open');
          document.querySelectorAll('.nav-menu > li').forEach(li => li.classList.remove('open'));
        }
      });
    });
  }

  // Scroll top button
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('show', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});
