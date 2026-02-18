(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const safeText = (s) => (s == null ? '' : String(s).trim());

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));

  /* ===== Toast ===== */
  const showToast = (message) => {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => (toast.hidden = true), 1400);
  };

  /* ===== Clipboard ===== */
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

  /* ===== Menus ===== */
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

  /* ===== Render menus from profile ===== */
  function renderContactMenu(profile) {
    const menu = $('#contactMenu');
    if (!menu) return;
    const telegram = safeText(profile?.contacts?.telegram);
    const email = safeText(profile?.contacts?.email);
    menu.innerHTML = `
      <a class="menu__item" role="menuitem" target="_blank" rel="noreferrer"
         href="${escapeHtml(telegram || '#')}">
        Telegram <span class="menu__meta">\u2197</span>
      </a>
      <a class="menu__item" role="menuitem"
         href="${escapeHtml(email ? 'mailto:' + email : '#')}">
        Email <span class="menu__meta">${escapeHtml(email || '')}</span>
      </a>
      <button class="menu__item" role="menuitem" type="button" id="copyEmailBtn">
        Скопировать email <span class="menu__meta">\u29C9</span>
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
        HH <span class="menu__meta">\u2197</span>
      </a>
      <a class="menu__item" role="menuitem" target="_blank" rel="noreferrer"
         href="${escapeHtml(github || '#')}">
        GitHub <span class="menu__meta">\u2197</span>
      </a>
    `;
  }

  /* ===== Cases rendering ===== */
  function appendCaseLine(root, label, value) {
    const text = safeText(value);
    if (!text) return;
    const p = document.createElement('p');
    p.className = 'case__line';
    const b = document.createElement('b');
    b.textContent = label + ': ';
    p.append(b, text);
    root.appendChild(p);
  }

  function renderCases(cases) {
    const list = $('#casesList');
    if (!list) return;
    list.innerHTML = '';

    if (!cases.length) {
      const empty = document.createElement('div');
      empty.className = 'callout';
      empty.textContent = 'Кейсы пока не добавлены.';
      list.appendChild(empty);
      return;
    }

    cases.forEach((caseData) => {
      const det = document.createElement('details');
      det.className = 'case';

      const sum = document.createElement('summary');
      sum.className = 'case__summary';

      const title = document.createElement('span');
      title.className = 'case__title';
      title.textContent = safeText(caseData?.title) || 'Без названия';

      const desc = document.createElement('span');
      desc.className = 'case__desc';
      desc.textContent = safeText(caseData?.desc);

      sum.appendChild(title);
      if (desc.textContent) sum.appendChild(desc);
      det.appendChild(sum);

      const body = document.createElement('div');
      body.className = 'case__body';

      const items = Array.isArray(caseData?.items) ? caseData.items : [];
      items.forEach((item) => {
        const itemDet = document.createElement('details');
        itemDet.className = 'case__item';

        const itemSum = document.createElement('summary');
        itemSum.className = 'case__itemSummary';

        const id = document.createElement('span');
        id.className = 'case__itemId';
        id.textContent = safeText(item?.id);

        const itemTitle = document.createElement('span');
        itemTitle.className = 'case__itemTitle';
        itemTitle.textContent = safeText(item?.title) || 'Подпункт';

        if (id.textContent) itemSum.appendChild(id);
        itemSum.appendChild(itemTitle);
        itemDet.appendChild(itemSum);

        const itemBody = document.createElement('div');
        itemBody.className = 'case__itemBody';

        appendCaseLine(itemBody, 'Окружение', item?.env);
        appendCaseLine(itemBody, 'Шаги', item?.steps);
        appendCaseLine(itemBody, 'Факт', item?.actual);
        appendCaseLine(itemBody, 'Ожидание', item?.expected);
        appendCaseLine(itemBody, 'Severity', item?.severity);
        appendCaseLine(itemBody, 'Priority', item?.priority);
        appendCaseLine(itemBody, 'Примечание', item?.note);

        const links = Array.isArray(item?.links) ? item.links : [];
        const validLinks = links.filter((l) => safeText(l?.url));
        if (validLinks.length) {
          const wrap = document.createElement('div');
          wrap.className = 'case__links';
          validLinks.forEach((link) => {
            const a = document.createElement('a');
            a.className = 'case__link';
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.href = safeText(link.url);
            a.textContent = safeText(link?.label) || 'Ссылка';
            wrap.appendChild(a);
          });
          itemBody.appendChild(wrap);
        }

        itemDet.appendChild(itemBody);
        body.appendChild(itemDet);
      });

      det.appendChild(body);
      list.appendChild(det);
    });
  }

  /* ===== iOS press effect for active tiles ===== */
  function bindTilePress() {
    document.querySelectorAll('.tile--active').forEach((tile) => {
      const addPress = () => tile.classList.add('pressing');
      const removePress = () => tile.classList.remove('pressing');

      tile.addEventListener('pointerdown', addPress);
      tile.addEventListener('pointerup', removePress);
      tile.addEventListener('pointerleave', removePress);
      tile.addEventListener('pointercancel', removePress);
    });
  }

  /* ===== Data loading ===== */
  async function loadJSON(path) {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }

  /* ===== Detect page type ===== */
  function isCasesPage() {
    return !!$('#casesList');
  }

  function basePath() {
    return isCasesPage() ? '../' : '';
  }

  /* ===== UI binding ===== */
  function bindUI(state) {
    const contactsBtn = $('#contactsBtn');
    const resumeBtn = $('#resumeBtn');
    const contactMenu = $('#contactMenu');
    const resumeMenu = $('#resumeMenu');

    if (contactMenu) contactMenu.hidden = true;
    if (resumeMenu) resumeMenu.hidden = true;
    setExpanded(contactsBtn, false);
    setExpanded(resumeBtn, false);

    contactsBtn?.addEventListener('click', () => toggleMenu(contactsBtn, contactMenu));
    resumeBtn?.addEventListener('click', () => toggleMenu(resumeBtn, resumeMenu));

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (contactMenu && !contactMenu.hidden) return closeMenus(contactsBtn);
      if (resumeMenu && !resumeMenu.hidden) return closeMenus(resumeBtn);
    });

    document.addEventListener('click', async (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      if (t.closest('#contactsBtn') || t.closest('#resumeBtn')) return;

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

  /* ===== Main ===== */
  async function main() {
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    const state = { email: '' };
    const base = basePath();

    // Load profile for header/menus
    try {
      const profile = await loadJSON(base + 'data/profile.json');
      state.email = safeText(profile?.contacts?.email) || '';

      const name = safeText(profile?.name) || 'Константин';
      const roleShort = safeText(profile?.roleShort) || 'Junior QA Engineer (Manual)';

      const nameTop = $('#nameTop');
      const roleTop = $('#roleTop');
      const nameFooter = $('#nameFooter');

      if (nameTop) nameTop.textContent = name;
      if (roleTop) roleTop.textContent = roleShort;
      if (nameFooter) nameFooter.textContent = name;

      renderContactMenu(profile);
      renderResumeMenu(profile);
    } catch (_) {
      // Profile didn't load — menus stay empty, static text stays
    }

    // Cases page: load and render cases
    if (isCasesPage()) {
      try {
        const cases = await loadJSON(base + 'data/cases.json');
        const arr = Array.isArray(cases) ? cases : [];
        renderCases(arr);
      } catch (_) {
        const box = $('#dataStatus');
        if (box) {
          box.hidden = false;
          box.textContent = 'Не удалось загрузить данные кейсов. Попробуйте обновить страницу.';
        }
        renderCases([]);
      }
    }

    // Main page: show cases count on tile
    if (!isCasesPage()) {
      try {
        const cases = await loadJSON(base + 'data/cases.json');
        const arr = Array.isArray(cases) ? cases : [];
        const total = arr.reduce((n, c) => n + (Array.isArray(c.items) ? c.items.length : 0), 0);
        const countEl = $('#casesCount');
        if (countEl && total > 0) {
          countEl.textContent = total + ' ' + pluralize(total, 'кейс', 'кейса', 'кейсов');
        }
      } catch (_) {
        // Silently skip count
      }
      bindTilePress();
    }

    bindUI(state);
  }

  function pluralize(n, one, few, many) {
    const abs = Math.abs(n) % 100;
    const last = abs % 10;
    if (abs > 10 && abs < 20) return many;
    if (last > 1 && last < 5) return few;
    if (last === 1) return one;
    return many;
  }

  main();
})();
