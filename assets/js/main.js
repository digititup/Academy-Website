/**
 * Pratik Chaudhary Academy - Main JavaScript Engine
 * Contact: digititup@gmail.com | WhatsApp: +9779812414094
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '9779812414094';

  // Pre-configured course messages
  const COURSE_MESSAGES = {
    'content-masterclass': {
      title: 'Content Masterclass',
      status: 'Releasing Soon',
      defaultMsg: 'Hi Pratik, I am interested in joining the Content Masterclass at Pratik Chaudhary Academy. Please share the syllabus and early-bird enrollment details!'
    },
    'ai-masterclass': {
      title: 'AI Masterclass',
      status: 'Releasing Soon',
      defaultMsg: 'Hi Pratik, I want to enroll in the AI Masterclass at Pratik Chaudhary Academy. Please add me to the early-access list!'
    },
    'flood-survival-guide': {
      title: 'Flood Survival Guide',
      status: 'Releasing Soon',
      defaultMsg: 'Hi Pratik, I want early access to the Flood Survival Guide & Emergency Preparedness course at Pratik Chaudhary Academy.'
    },
    'heat-survival-guide': {
      title: 'Heat Survival Guide',
      status: 'Releasing Soon',
      defaultMsg: 'Hi Pratik, I am interested in joining the Heat Survival Guide course at Pratik Chaudhary Academy. Please share release and early-access details!'
    },
    'weekly-cohort': {
      title: 'Weekly Cohort',
      status: 'Releasing Soon',
      defaultMsg: 'Hi Pratik, I would like to apply for the Weekly Live Cohort and mentorship program at Pratik Chaudhary Academy.'
    },
    'general': {
      title: 'General Inquiry',
      status: 'Available',
      defaultMsg: 'Hi Pratik, I have an inquiry regarding Pratik Chaudhary Academy. Could you please share more information?'
    }
  };

  /* -------------------------------------------------------------
     1. WHATSAPP LAUNCHER & INQUIRY MODAL
  ------------------------------------------------------------- */
  const waModal = document.getElementById('whatsappModal');
  const waForm = document.getElementById('whatsappForm');
  const waCourseInput = document.getElementById('waCourseInput');
  const waNameInput = document.getElementById('waNameInput');
  const waMsgInput = document.getElementById('waMsgInput');
  const waModalTitle = document.getElementById('waModalTitle');
  const waDirectBtn = document.getElementById('waDirectBtn');

  window.openWhatsApp = function(courseKey = 'general', direct = false) {
    const course = COURSE_MESSAGES[courseKey] || COURSE_MESSAGES['general'];
    
    if (direct) {
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(course.defaultMsg)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    // Open personalized modal
    if (waModal && waCourseInput && waMsgInput && waModalTitle) {
      waCourseInput.value = course.title;
      waModalTitle.textContent = `Inquire About ${course.title}`;
      waMsgInput.value = course.defaultMsg;
      if (waDirectBtn) {
        waDirectBtn.onclick = () => {
          const directUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(course.defaultMsg)}`;
          window.open(directUrl, '_blank', 'noopener,noreferrer');
          closeAllModals();
        };
      }
      openModal(waModal);
    } else {
      // Fallback direct
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(course.defaultMsg)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Wire up all WhatsApp trigger elements
  document.querySelectorAll('[data-whatsapp-course]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const courseKey = el.getAttribute('data-whatsapp-course');
      const isDirect = el.getAttribute('data-direct') === 'true';
      window.openWhatsApp(courseKey, isDirect);
    });
  });

  if (waForm) {
    waForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const course = waCourseInput ? waCourseInput.value : 'Pratik Chaudhary Academy';
      const name = waNameInput ? waNameInput.value.trim() : '';
      const customMsg = waMsgInput ? waMsgInput.value.trim() : '';

      let text = `Hi Pratik,\n`;
      if (name) text += `My name is: ${name}\n`;
      text += `Course/Section: ${course}\n`;
      text += `Message: ${customMsg || 'Please share enrollment details!'}`;

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      closeAllModals();
      showToast('Opening WhatsApp with your personalized inquiry...');
    });
  }

  /* -------------------------------------------------------------
     2. HEADER SCROLL & STICKY STATE
  ------------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  /* -------------------------------------------------------------
     3. DROPDOWN (MORE) TOGGLE
  ------------------------------------------------------------- */
  const dropdown = document.querySelector('.nav-dropdown');
  const dropdownTrigger = document.querySelector('.dropdown-trigger');

  if (dropdownTrigger && dropdown) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('active');
    });

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  }

  /* -------------------------------------------------------------
     4. MOBILE NAVIGATION DRAWER
  ------------------------------------------------------------- */
  const burgerBtn = document.querySelector('.burger-btn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.querySelector('.drawer-close');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  burgerBtn?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  // Close drawer on link click
  document.querySelectorAll('.drawer-links a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* -------------------------------------------------------------
     5. MODAL LOGIC (LOGIN & WHATSAPP)
  ------------------------------------------------------------- */
  const loginModal = document.getElementById('loginModal');
  const loginBtns = document.querySelectorAll('.trigger-login-modal');
  const modalCloses = document.querySelectorAll('.modal-close-btn, .modal-backdrop');

  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }

  loginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      openModal(loginModal);
    });
  });

  modalCloses.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target === btn || btn.classList.contains('modal-close-btn')) {
        closeAllModals();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      closeDrawer();
    }
  });

  // Auth Tabs inside Login Modal
  const authTabBtns = document.querySelectorAll('.auth-tab-btn');
  const authSubmitBtn = document.getElementById('authSubmitBtn');
  const authNameGroup = document.getElementById('authNameGroup');

  authTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      authTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-tab');
      if (mode === 'register') {
        if (authNameGroup) authNameGroup.style.display = 'block';
        if (authSubmitBtn) authSubmitBtn.textContent = 'Create Academy Account';
      } else {
        if (authNameGroup) authNameGroup.style.display = 'none';
        if (authSubmitBtn) authSubmitBtn.textContent = 'Sign In to Academy';
      }
    });
  });

  const authForm = document.getElementById('academyAuthForm');
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeAllModals();
      showToast('Welcome to Pratik Chaudhary Academy! You are signed in.');
    });
  }

  /* -------------------------------------------------------------
     6. FAQ ACCORDION
  ------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other open faqs
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('active');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        if (answer) answer.style.maxHeight = null;
      }
    });
  });

  /* -------------------------------------------------------------
     7. ANIMATED NUMBER COUNTERS
  ------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('[data-counter]');
  let counted = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statNumbers.forEach(stat => {
          const target = parseFloat(stat.getAttribute('data-counter'));
          const suffix = stat.getAttribute('data-suffix') || '';
          const decimals = parseInt(stat.getAttribute('data-decimals') || '0', 10);
          const duration = 2000;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = (target * easeProgress).toFixed(decimals);
            stat.textContent = currentVal + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              stat.textContent = target + suffix;
            }
          }
          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-strip');
  if (statsSection) {
    countObserver.observe(statsSection);
  }

  /* -------------------------------------------------------------
     8. INSTRUCTOR GALLERY THUMBNAIL SWITCHER
  ------------------------------------------------------------- */
  const mainInstructorImg = document.querySelector('.instructor-main-card img');
  const thumbBoxes = document.querySelectorAll('.thumbnail-box');

  thumbBoxes.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const thumbImg = thumb.querySelector('img');
      if (mainInstructorImg && thumbImg) {
        thumbBoxes.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        
        mainInstructorImg.style.opacity = '0.4';
        setTimeout(() => {
          mainInstructorImg.src = thumbImg.src;
          mainInstructorImg.alt = thumbImg.alt;
          mainInstructorImg.style.opacity = '1';
        }, 150);
      }
    });
  });

  /* -------------------------------------------------------------
     9. TOAST NOTIFICATION
  ------------------------------------------------------------- */
  window.showToast = function(msg) {
    let toast = document.getElementById('siteToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'siteToast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>⚡</span> <span>${msg}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };

  /* -------------------------------------------------------------
     10. SCROLL REVEAL OBSERVER & INTERACTIVE CURSOR SPOTLIGHT
  ------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // Interactive ambient cursor spotlight on hero
  const hero = document.querySelector('.hero-section');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      hero.style.setProperty('--mouse-x', `${x}px`);
      hero.style.setProperty('--mouse-y', `${y}px`);
    });
  }
});
