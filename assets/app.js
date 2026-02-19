(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
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
    showToast._t = setTimeout(() => (toast.hidden = true), 1800);
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
      const emptyEl = $('#casesEmpty');
      if (emptyEl) {
        emptyEl.hidden = false;
      } else {
        const empty = document.createElement('div');
        empty.className = 'callout';
        empty.textContent = 'Кейсы пока не добавлены.';
        list.appendChild(empty);
      }
      return;
    }

    const emptyEl = $('#casesEmpty');
    if (emptyEl) emptyEl.hidden = true;

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

  /* ===== iOS press effect ===== */
  function bindPressEffect(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      const add = () => el.classList.add('pressing');
      const remove = () => el.classList.remove('pressing');
      el.addEventListener('pointerdown', add);
      el.addEventListener('pointerup', remove);
      el.addEventListener('pointerleave', remove);
      el.addEventListener('pointercancel', remove);
    });
  }

  /* ===== Category filter logic ===== */
  function bindCategoryFilter(allCases) {
    const catTilesContainer = $('#catTiles');
    if (!catTilesContainer) return;

    const activeTiles = $$('.catTile--active', catTilesContainer);
    if (!activeTiles.length) return;

    let selectedCategory = activeTiles[0].dataset.category;
    activeTiles[0].classList.add('catTile--selected');
    renderCases(allCases.filter((c) => c.category === selectedCategory));

    activeTiles.forEach((tile) => {
      tile.addEventListener('click', () => {
        const cat = tile.dataset.category;
        if (cat === selectedCategory) return;

        selectedCategory = cat;
        activeTiles.forEach((t) => t.classList.remove('catTile--selected'));
        tile.classList.add('catTile--selected');

        const filtered = allCases.filter((c) => c.category === cat);
        renderCases(filtered);
      });
    });

    bindPressEffect('.catTile--active');
  }

  /* ===== Contacts page rendering ===== */
  function renderContacts(profile) {
    const email = safeText(profile?.contacts?.email);
    const telegram = safeText(profile?.contacts?.telegram);
    const github = safeText(profile?.links?.github);
    const hh = safeText(profile?.links?.hh);

    const emailEl = $('#contactEmail');
    if (emailEl && email) {
      emailEl.textContent = email;
      emailEl.href = 'mailto:' + escapeHtml(email);
    }

    const tgEl = $('#contactTelegram');
    if (tgEl && telegram) {
      tgEl.textContent = '@KezerioQA';
      tgEl.href = telegram;
    }

    const ghEl = $('#contactGitHub');
    if (ghEl && github) {
      ghEl.textContent = 'Kezerio';
      ghEl.href = github;
    }

    const hhRow = $('#contactHhRow');
    const hhEl = $('#contactHh');
    if (hhEl && hhRow && hh) {
      hhEl.href = hh;
      hhRow.hidden = false;
    }

    // Copy email button
    const copyBtn = $('#copyEmailBtn');
    if (copyBtn && email) {
      copyBtn.addEventListener('click', async () => {
        const ok = await copyToClipboard(email);
        showToast(ok ? 'Скопировано' : 'Не удалось скопировать');
      });
    }
  }

  /* ===== Resume links on /about/ ===== */
  function renderResumeLinks(profile) {
    const hh = safeText(profile?.links?.hh);
    if (!hh) return;

    const link = $('#resumeLink');
    const linkBottom = $('#resumeLinkBottom');
    if (link) link.href = hh;
    if (linkBottom) linkBottom.href = hh;
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

  function isContactsPage() {
    return !!$('#contactList');
  }

  function isAboutPage() {
    return !!$('#resumeSidebar');
  }

  function isSubPage() {
    return !!document.querySelector('link[href^="../assets/"]');
  }

  function basePath() {
    return isSubPage() ? '../' : '';
  }

  /* ===== Main ===== */
  async function main() {
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    const base = basePath();

    // Load profile
    try {
      const profile = await loadJSON(base + 'data/profile.json');

      const name = safeText(profile?.name) || 'Константин';
      const roleShort = safeText(profile?.roleShort) || 'Junior IT (QA / Backend / Web)';

      const nameTop = $('#nameTop');
      const roleTop = $('#roleTop');
      const nameFooter = $('#nameFooter');

      if (nameTop) nameTop.textContent = name;
      if (roleTop) roleTop.textContent = roleShort;
      if (nameFooter) nameFooter.textContent = name;

      // Contacts page
      if (isContactsPage()) {
        renderContacts(profile);
      }

      // About page — resume links
      if (isAboutPage()) {
        renderResumeLinks(profile);
      }
    } catch (_) {
      // Profile didn't load — static text stays
    }

    // Cases page: load cases and bind category filter
    if (isCasesPage()) {
      try {
        const cases = await loadJSON(base + 'data/cases.json');
        const arr = Array.isArray(cases) ? cases : [];
        bindCategoryFilter(arr);
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
    if (!isCasesPage() && !isContactsPage() && !isAboutPage()) {
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
    }

    // iOS press on active tiles (main page)
    bindPressEffect('.tile--active');
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
