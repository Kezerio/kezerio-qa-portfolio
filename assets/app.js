(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const safeText = (s) => (s == null ? '' : String(s).trim());

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
        renderCases(allCases.filter((c) => c.category === cat));
      });
    });

    bindPressEffect('.catTile--active');
  }

  /* ===== Tools page rendering ===== */
  function renderTools(tools, base) {
    const list = $('#toolsList');
    if (!list) return;
    list.innerHTML = '';

    tools.forEach((tool) => {
      const isActive = !!tool.active;

      if (isActive && tool.href) {
        const a = document.createElement('a');
        a.className = 'toolCard toolCard--active';
        a.href = tool.href.replace(/^tools\//, '');
        buildToolCardContent(a, tool, base);
        list.appendChild(a);
      } else {
        const div = document.createElement('div');
        div.className = 'toolCard toolCard--disabled';
        const badge = document.createElement('span');
        badge.className = 'toolCard__badge';
        badge.textContent = 'Скоро';
        div.appendChild(badge);

        const iconWrap = document.createElement('div');
        iconWrap.className = 'toolCard__icon';
        const emoji = document.createElement('span');
        emoji.className = 'toolCard__emoji';
        emoji.textContent = '🔧';
        iconWrap.appendChild(emoji);
        div.appendChild(iconWrap);

        const title = document.createElement('div');
        title.className = 'toolCard__title';
        title.textContent = safeText(tool.title) || 'Инструмент';
        div.appendChild(title);

        list.appendChild(div);
      }
    });

    bindPressEffect('.toolCard--active');
  }

  function buildToolCardContent(el, tool, base) {
    const iconWrap = document.createElement('div');
    iconWrap.className = 'toolCard__icon';
    if (tool.icon) {
      const img = document.createElement('img');
      img.src = base + tool.icon;
      img.alt = safeText(tool.title);
      iconWrap.appendChild(img);
    } else {
      const emoji = document.createElement('span');
      emoji.className = 'toolCard__emoji';
      emoji.textContent = '🛠';
      iconWrap.appendChild(emoji);
    }
    el.appendChild(iconWrap);

    const title = document.createElement('div');
    title.className = 'toolCard__title';
    title.textContent = safeText(tool.title);
    el.appendChild(title);

    if (tool.subtitle) {
      const sub = document.createElement('div');
      sub.className = 'toolCard__subtitle';
      sub.textContent = safeText(tool.subtitle);
      el.appendChild(sub);
    }

    if (tool.desc) {
      const desc = document.createElement('div');
      desc.className = 'toolCard__desc';
      desc.textContent = safeText(tool.desc);
      el.appendChild(desc);
    }
  }

  /* ===== Tool detail page ===== */
  function renderToolDetail(tool, base) {
    const container = $('#toolDetail');
    if (!container) return;

    const titleEl = $('#toolDetailTitle');
    if (titleEl) titleEl.textContent = safeText(tool.title);
    const subtitleEl = $('#toolDetailSubtitle');
    if (subtitleEl) subtitleEl.textContent = safeText(tool.subtitle);

    const descEl = $('#toolDetailDesc');
    if (descEl) {
      const p = document.createElement('p');
      p.textContent = safeText(tool.desc);
      descEl.appendChild(p);
    }

    const timelineEl = $('#toolDetailTimeline');
    if (timelineEl && Array.isArray(tool.timeline) && tool.timeline.length) {
      const wrap = document.createElement('div');
      wrap.className = 'timeline';

      tool.timeline.forEach((step) => {
        const stepEl = document.createElement('div');
        stepEl.className = 'timeline__step timeline__step--' + (step.status || 'planned');

        const dot = document.createElement('div');
        dot.className = 'timeline__dot';
        stepEl.appendChild(dot);

        const label = document.createElement('div');
        label.className = 'timeline__label';
        label.textContent = safeText(step.label);
        stepEl.appendChild(label);

        const line = document.createElement('div');
        line.className = 'timeline__line';
        stepEl.appendChild(line);

        wrap.appendChild(stepEl);
      });

      timelineEl.appendChild(wrap);
    }
  }

  /* ===== DLT QA Checklists page (checklists/dlt-qa/) ===== */
  function renderDltChecklists(items) {
    const list = $('#dltChecklistsList');
    if (!list) return;
    list.innerHTML = '';

    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'callout';
      empty.textContent = 'Чек-листы пока не добавлены.';
      list.appendChild(empty);
      return;
    }

    items.forEach((item) => {
      const det = document.createElement('details');
      det.className = 'checkCard';

      const sum = document.createElement('summary');
      sum.className = 'checkCard__head';

      const status = document.createElement('span');
      status.className = 'checkCard__status checkCard__status--' + (item.status || 'in-progress');
      status.textContent = statusLabel(item.status);
      sum.appendChild(status);

      const info = document.createElement('div');
      info.className = 'checkCard__info';

      const title = document.createElement('span');
      title.className = 'checkCard__title';
      title.textContent = safeText(item.title);
      info.appendChild(title);

      sum.appendChild(info);
      det.appendChild(sum);

      const body = document.createElement('div');
      body.className = 'checkCard__body';

      if (item.summary) {
        const desc = document.createElement('p');
        desc.className = 'checkCard__desc';
        desc.textContent = safeText(item.summary);
        body.appendChild(desc);
      }

      const checks = Array.isArray(item.checks) ? item.checks : [];
      if (checks.length) {
        const ul = document.createElement('ul');
        // Read-only markers: ✓ for done, ○ for in-progress
        const listMod = item.status === 'done' ? 'checkCard__list--done' : 'checkCard__list--pending';
        ul.className = 'checkCard__list ' + listMod;
        checks.forEach((check) => {
          const li = document.createElement('li');
          li.className = 'checkCard__item';
          li.textContent = safeText(check);
          ul.appendChild(li);
        });
        body.appendChild(ul);
      }

      det.appendChild(body);
      list.appendChild(det);
    });
  }

  /* ===== DLT QA Test Plans page (test-plans/dlt-qa/) ===== */
  function renderDltTestPlans(plans) {
    const list = $('#dltTestPlansList');
    if (!list) return;
    list.innerHTML = '';

    if (!plans.length) {
      const empty = document.createElement('div');
      empty.className = 'callout';
      empty.textContent = 'Тест-планы пока не добавлены.';
      list.appendChild(empty);
      return;
    }

    plans.forEach((plan) => {
      const det = document.createElement('details');
      det.className = 'planCard';

      const sum = document.createElement('summary');
      sum.className = 'planCard__head';

      const status = document.createElement('span');
      status.className = 'planCard__status planCard__status--' + (plan.status || 'in-progress');
      status.textContent = statusLabel(plan.status);
      sum.appendChild(status);

      const info = document.createElement('div');
      info.className = 'planCard__info';

      const title = document.createElement('span');
      title.className = 'planCard__title';
      title.textContent = safeText(plan.title);
      info.appendChild(title);

      sum.appendChild(info);
      det.appendChild(sum);

      const body = document.createElement('div');
      body.className = 'planCard__body';

      if (plan.summary) {
        const desc = document.createElement('p');
        desc.className = 'planCard__desc';
        desc.textContent = safeText(plan.summary);
        body.appendChild(desc);
      }

      const sections = Array.isArray(plan.sections) ? plan.sections : [];
      if (sections.length) {
        const ul = document.createElement('ul');
        ul.className = 'planCard__sections';
        sections.forEach((sec) => {
          const li = document.createElement('li');
          li.className = 'planCard__section';
          li.textContent = safeText(sec);
          ul.appendChild(li);
        });
        body.appendChild(ul);
      }

      det.appendChild(body);
      list.appendChild(det);
    });
  }

  /* ===== Status label helper ===== */
  function statusLabel(status) {
    switch (status) {
      case 'done': return 'Готово';
      case 'in-progress': return 'В работе';
      case 'in-review': return 'На ревью';
      case 'planned': return 'Запланировано';
      default: return 'В работе';
    }
  }

  /* ===== Contacts page ===== */
  function initContacts(profile) {
    const email    = safeText(profile?.contacts?.email);
    const telegram = safeText(profile?.contacts?.telegram);
    const github   = safeText(profile?.links?.github);
    const hh       = safeText(profile?.links?.hh);

    const emailValEl = $('#contactEmail');
    if (emailValEl && email) emailValEl.textContent = email;

    const tgTile = $('#contactTileTelegram');
    if (tgTile && telegram) tgTile.href = telegram;

    const ghTile = $('#contactTileGitHub');
    if (ghTile && github) ghTile.href = github;

    const hhTile = $('#contactTileHh');
    if (hhTile && hh) {
      hhTile.href = hh;
      hhTile.hidden = false;
    }

    const emailTile = $('#contactTileEmail');
    if (emailTile && email) {
      emailTile.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          doCopy(email);
        }
      });
      emailTile.addEventListener('click', () => doCopy(email));
    }

    bindPressEffect('.contactTile');
  }

  async function doCopy(email) {
    const ok = await copyToClipboard(email);
    showToast(ok ? 'Email скопирован' : 'Не удалось скопировать');
  }

  /* ===== Resume links on /about/ ===== */
  function initAbout(profile) {
    const hh = safeText(profile?.links?.hh);
    if (!hh) return;
    const btn = $('#resumeLinkBottom');
    if (btn) btn.href = hh;
  }

  /* ===== Data loading ===== */
  async function loadJSON(path) {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }

  /* ===== Page detection ===== */
  const isCasesPage         = () => !!$('#casesList');
  const isContactsPage      = () => !!$('#contactTiles');
  const isAboutPage         = () => !!$('#resumeCta');
  const isToolsPage         = () => !!$('#toolsList');
  const isToolDetailPage    = () => !!$('#toolDetail');
  const isDltChecklistsPage = () => !!$('#dltChecklistsList');
  const isDltTestPlansPage  = () => !!$('#dltTestPlansList');
  const isMainPage          = () => !!$('#tilesGrid');

  function basePath() {
    // 2-level deep (tools/dlt-qa, checklists/dlt-qa, test-plans/dlt-qa)
    if (document.querySelector('link[href^="../../assets/"]')) return '../../';
    // 1-level deep (cases, about, contacts, tools, checklists, test-plans)
    if (document.querySelector('link[href^="../assets/"]')) return '../';
    return '';
  }

  /* ===== Main ===== */
  async function main() {
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    const base = basePath();

    // Load profile
    try {
      const profile = await loadJSON(base + 'data/profile.json');

      const name      = safeText(profile?.name)      || 'Константин';
      const roleShort = safeText(profile?.roleShort) || 'Junior IT (QA / Backend / Web)';

      const nameTop    = $('#nameTop');
      const roleTop    = $('#roleTop');
      const nameFooter = $('#nameFooter');
      if (nameTop)    nameTop.textContent    = name;
      if (roleTop)    roleTop.textContent    = roleShort;
      if (nameFooter) nameFooter.textContent = name;

      if (isContactsPage()) initContacts(profile);
      if (isAboutPage())    initAbout(profile);
    } catch (_) {
      // Profile didn't load — static fallback text stays
    }

    // Cases page
    if (isCasesPage()) {
      try {
        const cases = await loadJSON(base + 'data/cases.json');
        bindCategoryFilter(Array.isArray(cases) ? cases : []);
      } catch (_) {
        const box = $('#dataStatus');
        if (box) { box.hidden = false; box.textContent = 'Не удалось загрузить кейсы. Обновите страницу.'; }
        renderCases([]);
      }
    }

    // Tools list page
    if (isToolsPage()) {
      try {
        const tools = await loadJSON(base + 'data/tools.json');
        renderTools(Array.isArray(tools) ? tools : [], base);
      } catch (_) {}
    }

    // Tool detail page (tools/dlt-qa/)
    if (isToolDetailPage()) {
      try {
        const tools = await loadJSON(base + 'data/tools.json');
        const arr = Array.isArray(tools) ? tools : [];
        const pathParts = window.location.pathname.replace(/\/+$/, '').split('/');
        const slug = pathParts[pathParts.length - 1];
        const tool = arr.find((t) => t.id === slug) || arr[0];
        if (tool) renderToolDetail(tool, base);
      } catch (_) {}
    }

    // DLT QA Checklists page (checklists/dlt-qa/)
    if (isDltChecklistsPage()) {
      try {
        const data = await loadJSON(base + 'data/checklists.json');
        const items = Array.isArray(data?.items) ? data.items : [];
        renderDltChecklists(items);
      } catch (_) {}
    }

    // DLT QA Test Plans page (test-plans/dlt-qa/)
    if (isDltTestPlansPage()) {
      try {
        const plans = await loadJSON(base + 'data/testplans.json');
        renderDltTestPlans(Array.isArray(plans) ? plans : []);
      } catch (_) {}
    }

    // Main page: count badges (cases + tools only)
    if (isMainPage()) {
      try {
        const cases = await loadJSON(base + 'data/cases.json');
        const arr   = Array.isArray(cases) ? cases : [];
        const total = arr.reduce((n, c) => n + (Array.isArray(c.items) ? c.items.length : 0), 0);
        const countEl = $('#casesCount');
        if (countEl && total > 0) {
          countEl.textContent = total + ' ' + pluralize(total, 'кейс', 'кейса', 'кейсов');
        }
      } catch (_) {}

      try {
        const tools = await loadJSON(base + 'data/tools.json');
        const active = (Array.isArray(tools) ? tools : []).filter((t) => t.active).length;
        const countEl = $('#toolsCount');
        if (countEl && active > 0) {
          countEl.textContent = active + ' ' + pluralize(active, 'инструмент', 'инструмента', 'инструментов');
        }
      } catch (_) {}
    }

    // iOS press on all interactive elements
    bindPressEffect('.tile--active');
    bindPressEffect('.toolCard--active');
    bindPressEffect('.dltNav__btn');
  }

  function pluralize(n, one, few, many) {
    const abs  = Math.abs(n) % 100;
    const last = abs % 10;
    if (abs > 10 && abs < 20) return many;
    if (last > 1  && last < 5) return few;
    if (last === 1) return one;
    return many;
  }

  main();
})();
