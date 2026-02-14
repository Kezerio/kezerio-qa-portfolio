(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const safeText = (s) => (s == null ? '' : String(s).trim());

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c]));

  const showToast = (message) => {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => (toast.hidden = true), 1400);
  };

  async function copyToClipboard(text) {
    const value = safeText(text);
    if (!value) return false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch (_) {}

    try {
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.setAttribute('readonly', 'true');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch (_) {
      return false;
    }
  }

  function setExpanded(btn, expanded) {
    if (!btn) return;
    btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  function closeMenus(focusBtn = null) {
    const contactsBtn = $('#contactsBtn');
    const resumeBtn = $('#resumeBtn');
    const contactMenu = $('#contactMenu');
    const resumeMenu = $('#resumeMenu');

    if (contactMenu) contactMenu.hidden = true;
    if (resumeMenu) resumeMenu.hidden = true;

    setExpanded(contactsBtn, false);
    setExpanded(resumeBtn, false);

    if (focusBtn) focusBtn.focus();
  }

  function openMenu(btn, menu) {
    if (!btn || !menu) return;
    closeMenus();
    menu.hidden = false;
    setExpanded(btn, true);
    menu.querySelector('.menu__item')?.focus();
  }

  function toggleMenu(btn, menu) {
    if (!btn || !menu) return;
    if (!menu.hidden) return closeMenus(btn);
    openMenu(btn, menu);
  }

  function renderContactMenu(profile) {
    const menu = $('#contactMenu');
    if (!menu) return;

    const telegram = safeText(profile?.contacts?.telegram);
    const email = safeText(profile?.contacts?.email);

    menu.innerHTML = `
      <a class="menu__item" role="menuitem" target="_blank" rel="noreferrer"
         href="${escapeHtml(telegram || '#')}">
        Telegram <span class="menu__meta">↗</span>
      </a>
      <a class="menu__item" role="menuitem"
         href="${escapeHtml(email ? `mailto:${email}` : '#')}">
        Email <span class="menu__meta">${escapeHtml(email || '')}</span>
      </a>
      <button class="menu__item" role="menuitem" type="button" id="copyEmailBtn">
        Скопировать email <span class="menu__meta">⧉</span>
      </button>
    `;
  }

  function renderResumeMenu(profile) {
    const menu = $('#resumeMenu');
    if (!menu) return;

    const hh = safeText(profile?.links?.hh);
    const github = safeText(profile?.links?.github);

    menu.innerHTML = `
      <a class="menu__item" role="menuitem" target="_blank" rel="noreferrer"
         href="${escapeHtml(hh || '#')}">
        HH <span class="menu__meta">↗</span>
      </a>
      <a class="menu__item" role="menuitem" target="_blank" rel="noreferrer"
         href="${escapeHtml(github || '#')}">
        GitHub <span class="menu__meta">↗</span>
      </a>
    `;
  }

  async function loadProfile(path = 'data/profile.json') {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
    return res.json();
  }

  function applyProfile(profile) {
    const name = safeText(profile?.name) || 'Константин';
    const roleShort = safeText(profile?.roleShort) || 'Junior QA Engineer (Manual)';
    const roleLong = safeText(profile?.roleLong) || roleShort;
    const pitch = safeText(profile?.pitch);

    const nameTop = $('#nameTop');
    const roleTop = $('#roleTop');
    const nameHero = $('#nameHero');
    const roleHero = $('#roleHero');
    const nameFooter = $('#nameFooter');
    const pitchEl = $('#pitch');

    if (nameTop) nameTop.textContent = name;
    if (roleTop) roleTop.textContent = roleShort;
    if (nameHero) nameHero.textContent = name;
    if (roleHero) roleHero.textContent = roleLong;
    if (nameFooter) nameFooter.textContent = name;
    if (pitchEl && pitch) pitchEl.textContent = pitch;

    renderContactMenu(profile);
    renderResumeMenu(profile);
  }

  function bindUI(state) {
    const contactsBtn = $('#contactsBtn');
    const resumeBtn = $('#resumeBtn');
    const contactsNavLink = $('#contactsNavLink');
    const contactMenu = $('#contactMenu');
    const resumeMenu = $('#resumeMenu');

    if (contactMenu) contactMenu.hidden = true;
    if (resumeMenu) resumeMenu.hidden = true;
    setExpanded(contactsBtn, false);
    setExpanded(resumeBtn, false);

    contactsBtn?.addEventListener('click', () => toggleMenu(contactsBtn, contactMenu));
    resumeBtn?.addEventListener('click', () => toggleMenu(resumeBtn, resumeMenu));
    contactsNavLink?.addEventListener('click', () => toggleMenu(contactsBtn, contactMenu));

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (contactMenu && !contactMenu.hidden) return closeMenus(contactsBtn);
      if (resumeMenu && !resumeMenu.hidden) return closeMenus(resumeBtn);
    });

    document.addEventListener('click', async (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;

      if (t.closest('#contactsBtn') || t.closest('#resumeBtn') || t.closest('#contactsNavLink')) return;

      if (t.id === 'copyEmailBtn') {
        const ok = await copyToClipboard(state.email || '');
        showToast(ok ? 'Email скопирован' : 'Не удалось скопировать');
        closeMenus(contactsBtn);
        return;
      }

      if (t.closest('#contactMenu')) return closeMenus(contactsBtn);
      if (t.closest('#resumeMenu')) return closeMenus(resumeBtn);

      closeMenus();
    });
  }

  async function main() {
    $('#year') && ($('#year').textContent = String(new Date().getFullYear()));

    const state = { email: '' };

    try {
      const profile = await loadProfile('data/profile.json');
      state.email = safeText(profile?.contacts?.email) || '';
      applyProfile(profile);
    } catch (_) {
      const box = $('#dataStatus');
      if (box) {
        box.hidden = false;
        box.textContent =
          'Не удалось загрузить data/profile.json. На GitHub Pages всё ок, а при file:// fetch блокируется.';
      }
      applyProfile({});
    }

    bindUI(state);
  }

  main();
})();