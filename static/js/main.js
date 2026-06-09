/* ════════════════════════════════════════
   PORTFOLIO JS — Interactions & Animations
════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Custom Cursor ── */
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  (function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
    requestAnimationFrame(animateTrail);
  })();

  document.querySelectorAll('a, button, [class*="project-item"], .cloud-tag, .badge').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(3)';
      trail.style.transform = 'translate(-50%,-50%) scale(1.5)';
      trail.style.borderColor = 'rgba(201,169,110,0.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      trail.style.transform = 'translate(-50%,-50%) scale(1)';
      trail.style.borderColor = 'rgba(201,169,110,0.4)';
    });
  });

  /* ── Navbar scroll ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ── Hamburger Menu ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* ── Intersection Observer: fade-in ── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  // Mark elements for reveal
  const revealSelectors = [
    '.about-grid > *', '.skills-grid > *', '.contact-grid > *',
    '.project-item', '.cert-card', '.section-label',
    '.section-title.center', '.about-badges .badge'
  ];
  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = (i * 0.1) + 's';
      io.observe(el);
    });
  });

  /* ── Animated Counter ── */
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count);
      let start = 0;
      const duration = 1800;
      const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num').forEach(el => counterObs.observe(el));

  /* ── Skill Bars ── */
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.width = e.target.dataset.width + '%';
      skillObs.unobserve(e.target);
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-fill').forEach(el => {
    el.style.width = '0';
    skillObs.observe(el);
  });

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  });

  /* ── Contact Form ── */
  const form = document.getElementById('contactForm');
  const btnText = document.getElementById('btnText');
  const response = document.getElementById('formResponse');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('fname').value.trim();
      const email = document.getElementById('femail').value.trim();
      const message = document.getElementById('fmessage').value.trim();

      if (!name || !email || !message) {
        response.textContent = 'Please fill in all fields.';
        response.className = 'form-response error';
        return;
      }

      btnText.textContent = 'Sending...';
      document.getElementById('submitBtn').disabled = true;

      try {
        const res = await fetch('/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
        const data = await res.json();

        if (data.success) {
          response.textContent = '✓ ' + data.message;
          response.className = 'form-response';
          form.reset();
        } else {
          response.textContent = '✗ ' + (data.error || 'Something went wrong.');
          response.className = 'form-response error';
        }
      } catch (err) {
        response.textContent = '✗ Network error. Please try again.';
        response.className = 'form-response error';
      } finally {
        btnText.textContent = 'Send Message';
        document.getElementById('submitBtn').disabled = false;
      }
    });
  }

  /* ── Parallax on hero orbs ── */
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    const orb3 = document.querySelector('.orb-3');
    if (orb1) orb1.style.transform = `translate(${x * 0.8}px, ${y * 0.8}px)`;
    if (orb2) orb2.style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
    if (orb3) orb3.style.transform = `translate(${x * 1.2}px, ${y * 1.2}px)`;
  });

  /* ── Typing effect for hero eyebrow ── */
  const eyebrow = document.querySelector('.eyebrow-text');
  if (eyebrow) {
    const text = eyebrow.textContent;
    eyebrow.textContent = '';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        eyebrow.textContent += text[i++];
        setTimeout(type, 40);
      }
    };
    setTimeout(type, 800);
  }

  /* ── Smooth active nav link style ── */
  const style = document.createElement('style');
  style.textContent = `.nav-link.active { color: var(--cream); } .nav-link.active::after { width: 100%; }`;
  document.head.appendChild(style);

})();
