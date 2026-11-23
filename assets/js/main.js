// Cezeri Games - Main Client Interactive Script

(function initTimeBasedTheme() {
  try {
    const saved = localStorage.getItem('cezeri_theme');
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour < 7;
    const theme = (saved === 'dark' || saved === 'light') ? saved : (isNight ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();

document.addEventListener('DOMContentLoaded', () => {
  // 0. Quiet Manual Theme Toggle Button (Auto-injected into Header)
  const SUN_ICON = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path stroke-linecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/></svg>';
  const MOON_ICON = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function getActiveTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      try { localStorage.setItem('cezeri_theme', theme); } catch (e) {}
    }
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? SUN_ICON : MOON_ICON;
      btn.setAttribute('aria-label', theme === 'dark' ? 'Gündüz moduna geç' : 'Gece moduna geç');
      btn.setAttribute('title', theme === 'dark' ? 'Gündüz modu' : 'Gece modu');
    }
  }

  const header = document.querySelector('header');
  if (header && !document.getElementById('theme-toggle-btn')) {
    const langTrigger = header.querySelector('#lang-trigger, #lang-btn-trigger');
    const targetParent = langTrigger && langTrigger.parentElement ? langTrigger.parentElement.parentElement : header.querySelector('div > div:last-child, div > a:last-child')?.parentElement;

    if (targetParent) {
      const themeBtn = document.createElement('button');
      themeBtn.id = 'theme-toggle-btn';
      themeBtn.type = 'button';
      themeBtn.className = 'flex items-center justify-center w-9 h-9 rounded-lg bg-white hover:bg-[#EAF2F7] text-[#45586B] border border-[#0F1B26]/10 transition-colors duration-150 shrink-0';
      themeBtn.addEventListener('click', () => {
        const next = getActiveTheme() === 'dark' ? 'light' : 'dark';
        applyTheme(next, true);
      });

      if (langTrigger && langTrigger.parentElement && langTrigger.parentElement.parentElement === targetParent) {
        targetParent.insertBefore(themeBtn, langTrigger.parentElement);
      } else {
        targetParent.appendChild(themeBtn);
      }
      applyTheme(getActiveTheme(), false);
    }
  }

  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Dynamic Year
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });

  // 3. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // 4. Copy Email Helper
  const copyEmailBtns = document.querySelectorAll('.btn-copy-email');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email') || 'support@cezerigames.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<svg class="w-4 h-4 text-[#15803D] inline shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span>Kopyalandı</span>`;
        setTimeout(() => {
          btn.innerHTML = originalHTML;
        }, 2000);
      });
    });
  });
});
