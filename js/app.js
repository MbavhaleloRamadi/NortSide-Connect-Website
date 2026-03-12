/* ==========================================================================
   NortSide Connect — Unified Application Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ——————————————————————————————————————
  // 1. PRELOADER
  // ——————————————————————————————————————
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('loaded');
      setTimeout(() => preloader.remove(), 500);
    });
    // Failsafe: remove after 3s even if load event doesn't fire
    setTimeout(() => {
      preloader.classList.add('loaded');
      setTimeout(() => preloader.remove(), 500);
    }, 3000);
  }

  // ——————————————————————————————————————
  // 2. THEME TOGGLE (Dark / Light)
  // ——————————————————————————————————————
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('nortside-theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else {
    // Default to dark
    html.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('nortside-theme', next);
    });
  }

  // ——————————————————————————————————————
  // 3. MOBILE NAVIGATION
  // ——————————————————————————————————————
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close on nav link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#navMenu') && !e.target.closest('#mobileToggle')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // ——————————————————————————————————————
  // 4. STICKY HEADER
  // ——————————————————————————————————————
  const header = document.getElementById('siteHeader');
  if (header) {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('scrolled', window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ——————————————————————————————————————
  // 5. SCROLL REVEAL ANIMATIONS
  // ——————————————————————————————————————
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show everything
    reveals.forEach(el => el.classList.add('visible'));
  }

  // ——————————————————————————————————————
  // 6. HERO COUNTER ANIMATION
  // ——————————————————————————————————————
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const duration = 1500;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        el.textContent = Math.floor(ease * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(el => counterObserver.observe(el));
    } else {
      counters.forEach(animateCounter);
    }
  }

  // ——————————————————————————————————————
  // 7. CHATBOT
  // ——————————————————————————————————————
  const chatFab = document.getElementById('chatbotFab');
  const chatWindow = document.getElementById('chatbotWindow');
  const chatClose = document.getElementById('chatClose');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatMessages = document.getElementById('chatMessages');

  if (chatFab && chatWindow) {
    chatFab.addEventListener('click', () => {
      chatWindow.classList.add('open');
      chatFab.style.display = 'none';
      chatInput?.focus();
    });

    chatClose?.addEventListener('click', () => {
      chatWindow.classList.remove('open');
      chatFab.style.display = 'block';
    });

    const appendMsg = (sender, text) => {
      const div = document.createElement('div');
      div.className = `chat-message ${sender}`;
      div.innerHTML = `<p>${text}</p>`;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const handleChat = () => {
      const msg = chatInput.value.trim();
      if (!msg) return;
      appendMsg('user', msg);
      chatInput.value = '';

      setTimeout(() => {
        const lower = msg.toLowerCase();
        let reply;

        if (/hello|hi|hey|howzit/.test(lower)) {
          reply = 'Hello! How can I help you today?';
        } else if (/services|offer|what do you do/.test(lower)) {
          reply = 'We offer AI Agent Development, Mobile Apps, Cybersecurity, CIPC Registration, Tax Registration, and Graphic Design. Which one interests you?';
        } else if (/ai|agent|chatbot|automat/.test(lower)) {
          reply = 'Our AI solutions include custom agents, workflow automation, and analytics to optimise your operations. Want to schedule a consultation?';
        } else if (/cipc|company reg|register/.test(lower)) {
          reply = 'We handle full CIPC company registration — Pty Ltd, NPC, or name reservations. We\'ll take care of the paperwork so you can focus on building.';
        } else if (/tax|sars|vat/.test(lower)) {
          reply = 'We register businesses with SARS for Income Tax, VAT, PAYE, and UIF. Need help getting compliant?';
        } else if (/price|cost|how much|pricing/.test(lower)) {
          reply = 'Pricing depends on the project scope. Book a free consultation and we\'ll give you a personalised quote!';
        } else if (/contact|email|phone|call/.test(lower)) {
          reply = 'You can reach us at nortsideconnect24@gmail.com or call +27 (82) 4035 469.';
        } else if (/thank/.test(lower)) {
          reply = 'You\'re welcome! Anything else I can help with?';
        } else if (/bye|goodbye/.test(lower)) {
          reply = 'Cheers! Feel free to come back anytime. 👋';
        } else {
          reply = 'Thanks for your message! Would you like to know about our services, book a consultation, or chat with someone from the team?';
        }

        appendMsg('bot', reply);
      }, 800);
    };

    chatSend?.addEventListener('click', handleChat);
    chatInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleChat();
    });
  }

  // ——————————————————————————————————————
  // 8. SMOOTH SCROLL FOR ANCHOR LINKS
  // ——————————————————————————————————————
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight + 20 : 80;
        const pos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  // ——————————————————————————————————————
  // 9. FAQ ACCORDION (Contact page)
  // ——————————————————————————————————————
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');

      // Close others
      document.querySelectorAll('.faq-item.active').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });

      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '0';
      }
    });
  });

  // ——————————————————————————————————————
  // 10. CONTACT FORM (Contact page)
  // ——————————————————————————————————————
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.getElementById('formSuccess');
      contactForm.reset();
      if (success) {
        success.style.display = 'block';
        setTimeout(() => success.style.display = 'none', 4000);
      }
    });
  }

  // ——————————————————————————————————————
  // 11. TABS (Services / Why AI pages)
  // ——————————————————————————————————————
  document.querySelectorAll('.service-tabs, .research-tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    const parentSection = tabGroup.closest('section') || document;
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target || btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        parentSection.querySelectorAll('.tab-content, .tab-panel').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const targetEl = document.getElementById(targetId);
        if (targetEl) targetEl.classList.add('active');
      });
    });
  });

  // ——————————————————————————————————————
  // 12. MODALS (Why AI page)
  // ——————————————————————————————————————
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById(trigger.getAttribute('data-modal'));
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-container');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  document.querySelectorAll('.modal-container').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

});