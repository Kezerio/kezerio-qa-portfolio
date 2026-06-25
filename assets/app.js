(() => {
  'use strict';

  const siteData = window.profileData;
  const languageStorageKey = 'kv-site-language';
  const supportedLanguages = ['ru', 'us'];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  if (!siteData || !$('#hero')) return;

  let currentLanguage = readInitialLanguage();
  let revealObserver = null;
  let aboutGalleryIndex = 0;

  const esc = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const lineBreaks = (value) => esc(value).replaceAll('\n', '<br />');

  function readInitialLanguage() {
    try {
      const saved = window.localStorage.getItem(languageStorageKey);
      return supportedLanguages.includes(saved) ? saved : 'ru';
    } catch {
      return 'ru';
    }
  }

  function saveLanguage(language) {
    try {
      window.localStorage.setItem(languageStorageKey, language);
    } catch {
      // localStorage can be unavailable in strict privacy contexts.
    }
  }

  function setLanguage(language) {
    if (!supportedLanguages.includes(language) || language === currentLanguage) return;
    currentLanguage = language;
    saveLanguage(language);
    document.body.classList.remove('nav-open');
    render();
  }

  function linkAttrs(href) {
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return '';
    return ' target="_blank" rel="noopener noreferrer"';
  }

  function buttonLink(item, fallbackVariant = 'secondary') {
    const variant = item.variant || fallbackVariant;
    const className = `btn btn--${variant}`;

    if (item.action === 'copyEmail') {
      return `<button class="${className}" type="button" data-copy-email data-original-label="${esc(item.label)}">${esc(item.label)}</button>`;
    }

    if (item.action === 'copyPhone') {
      return `<button class="${className}" type="button" data-copy-phone data-original-label="${esc(item.label)}">${esc(item.label)}</button>`;
    }

    if (item.disabled || !item.href) {
      return `<span class="${className} is-disabled" aria-disabled="true">${esc(item.label)}</span>`;
    }

    return `<a class="${className}" href="${esc(item.href)}"${linkAttrs(item.href)}>${esc(item.label)}</a>`;
  }

  function textLink(item) {
    if (item.action === 'copyEmail') {
      return `<button class="footer-copy-link" type="button" data-copy-email>${esc(item.label)}</button>`;
    }
    if (!item.href) return '';
    return `<a href="${esc(item.href)}"${linkAttrs(item.href)}>${esc(item.label)}</a>`;
  }

  function chipList(items, className = 'chip-list') {
    if (!items?.length) return '';
    return `
      <div class="${className}">
        ${items.map((item) => `<span>${esc(item)}</span>`).join('')}
      </div>
    `;
  }

  function cleanList(items) {
    if (!items?.length) return '';
    return `
      <ul class="clean-list">
        ${items.map((item) => `<li>${esc(item)}</li>`).join('')}
      </ul>
    `;
  }

  function sectionHead(id, eyebrow, title, subtitle) {
    return `
      <div class="section-head reveal">
        <p class="eyebrow">${esc(eyebrow)}</p>
        <h2 id="${esc(id)}">${esc(title)}</h2>
        ${subtitle ? `<p>${esc(subtitle)}</p>` : ''}
      </div>
    `;
  }

  function updateDocument(copy) {
    document.documentElement.lang = copy.meta.lang;
    document.body.dataset.siteLanguage = currentLanguage;
    document.title = copy.meta.title;

    const description = $('meta[name="description"]');
    if (description) description.setAttribute('content', copy.meta.description);

    const ogTitle = $('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', copy.meta.title);

    const ogDescription = $('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', copy.meta.ogDescription);
  }

  function ensureToast() {
    let toast = $('#copyToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'copyToast';
      toast.className = 'copy-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.append(toast);
    }
    return toast;
  }

  async function copyToClipboard(value) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.append(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }

  function showCopyToast(message) {
    const toast = ensureToast();
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(showCopyToast.hideTimer);
    showCopyToast.hideTimer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 1300);
  }

  function setCopyFeedback(trigger, label) {
    if (!trigger?.classList.contains('btn')) return;
    const originalLabel = trigger.dataset.originalLabel || trigger.textContent;
    trigger.textContent = label;
    trigger.classList.add('is-copied');
    window.clearTimeout(trigger.copyFeedbackTimer);
    trigger.copyFeedbackTimer = window.setTimeout(() => {
      trigger.textContent = originalLabel;
      trigger.classList.remove('is-copied');
    }, 1300);
  }

  async function copyEmail(trigger) {
    const copy = siteData[currentLanguage];
    const email = siteData.links.emailText;

    try {
      await copyToClipboard(email);
    } catch {
      // The toast still gives a clear click response if clipboard access is blocked.
    }

    setCopyFeedback(trigger, copy.ui.copiedShort);
    showCopyToast(copy.ui.emailCopied);
  }

  async function copyPhone(trigger) {
    const copy = siteData[currentLanguage];

    try {
      await copyToClipboard(siteData.links.phoneText);
    } catch {
      // The toast still gives a clear click response if clipboard access is blocked.
    }

    setCopyFeedback(trigger, copy.ui.copiedShort);
    showCopyToast(copy.ui.phoneCopied);
  }

  function renderHeader(copy) {
    const skipLink = $('.skip-link');
    if (skipLink) skipLink.textContent = copy.ui.skipLink;

    const brand = $('.brand');
    if (brand) brand.setAttribute('aria-label', copy.ui.brandAria);

    const brandName = $('[data-brand-name]');
    if (brandName) brandName.textContent = copy.person.nameEn;

    const brandRole = $('[data-brand-role]');
    if (brandRole) brandRole.textContent = copy.person.shortRole || copy.person.role;

    const nav = $('#mainNav');
    nav.setAttribute('aria-label', copy.ui.navAria);
    nav.innerHTML = copy.nav.map(([label, href]) => `<a href="${esc(href)}">${esc(label)}</a>`).join('');

    const headerCta = $('#headerCta');
    if (headerCta) headerCta.textContent = copy.ui.headerCta;

    const languageSwitch = $('#languageSwitch');
    if (languageSwitch) {
      languageSwitch.setAttribute('aria-label', copy.ui.languageAria);
      languageSwitch.innerHTML = supportedLanguages.map((language) => `
        <button class="language-switch__option" type="button" data-language="${language}" aria-pressed="${language === currentLanguage}">
          ${language === 'ru' ? 'RU' : 'US'}
        </button>
      `).join('');
    }

    const menuToggle = $('#menuToggle');
    if (menuToggle) {
      const isOpen = document.body.classList.contains('nav-open');
      menuToggle.setAttribute('aria-label', isOpen ? copy.ui.closeMenu : copy.ui.openMenu);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    }
  }

  function renderHero(copy) {
    $('#hero').innerHTML = `
      <div class="wrap hero__grid">
        <div class="hero__copy reveal">
          <p class="eyebrow">${esc(copy.hero.eyebrow)}</p>
          <h1 id="heroTitle">${lineBreaks(copy.hero.title)}</h1>
          <p class="hero__lead">${esc(copy.hero.subtitle)}</p>
          ${copy.hero.description ? `<p class="hero__description">${esc(copy.hero.description)}</p>` : ''}
          <div class="hero__actions">
            ${copy.hero.cta.map((item) => buttonLink(item)).join('')}
          </div>
          <div class="proof-list" aria-label="${esc(copy.ui.evidenceLabel)}">
            ${copy.hero.proofPoints.map((item) => `<span>${esc(item)}</span>`).join('')}
          </div>
          ${copy.hero.quote ? `<p class="hero__quote">${esc(copy.hero.quote)}</p>` : ''}
        </div>

        <div class="hero__visual reveal">
          <figure class="portrait-panel">
            <img src="${esc(siteData.assets.heroImage)}" alt="${esc(copy.hero.imageAlt)}" width="1040" height="1280" loading="eager" />
            <figcaption>${esc(copy.hero.status)}</figcaption>
          </figure>
        </div>
      </div>
    `;
  }

  function galleryItems(copy) {
    const items = siteData.aboutGallery?.length ? siteData.aboutGallery : [
      { src: siteData.assets.aboutImage, alt: copy.about.imageAlt },
    ];
    return items;
  }

  function renderAbout(copy) {
    const items = galleryItems(copy);
    aboutGalleryIndex = Math.min(aboutGalleryIndex, items.length - 1);
    const activeItem = items[aboutGalleryIndex];
    const hasControls = items.length > 1;

    $('#about').innerHTML = `
      <div class="wrap about-layout">
        <div class="about-copy reveal">
          <p class="eyebrow">${esc(copy.about.eyebrow)}</p>
          <h2 id="aboutTitle">${esc(copy.about.title)}</h2>
          <div class="rich-text">
            ${copy.about.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}
          </div>
          <div class="about-notes">
            ${copy.about.notes.map((note) => `<span>${esc(note)}</span>`).join('')}
          </div>
        </div>
        <div class="about-gallery reveal" data-about-gallery aria-label="${esc(copy.ui.galleryLabel)}" ${hasControls ? 'tabindex="0"' : ''}>
          <div class="about-gallery__stage">
            <img class="is-loaded" data-gallery-image src="${esc(activeItem.src)}" alt="${esc(activeItem.alt)}" width="980" height="1280" loading="lazy" />
            ${hasControls ? `
              <button class="gallery-button gallery-button--prev" type="button" data-gallery-prev aria-label="${esc(copy.ui.galleryPrevious)}">‹</button>
              <button class="gallery-button gallery-button--next" type="button" data-gallery-next aria-label="${esc(copy.ui.galleryNext)}">›</button>
            ` : ''}
          </div>
          ${hasControls ? `
            <div class="gallery-dots" role="group" aria-label="${esc(copy.ui.galleryLabel)}">
              ${items.map((item, index) => `
                <button type="button" data-gallery-dot="${index}" aria-label="${esc(`${copy.ui.galleryDot} ${index + 1}`)}" aria-pressed="${index === aboutGalleryIndex}">
                  <span></span>
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function renderExperience(copy) {
    $('#experience').innerHTML = `
      <div class="wrap">
        ${sectionHead('experienceTitle', copy.experience.eyebrow, copy.experience.title, copy.experience.subtitle)}
        <div class="experience-list">
          ${copy.experience.items.map((item) => `
            <article class="experience-row ${item.current ? 'experience-row--current' : ''} reveal">
              <div class="experience-row__meta">
                <span>${esc(item.period)}</span>
                ${item.location ? `<small>${esc(item.location)}</small>` : ''}
                ${item.format ? `<small>${esc(item.format)}</small>` : ''}
                ${item.current ? `<strong>${esc(copy.ui.currentLabel)}</strong>` : ''}
              </div>
              <div class="experience-row__body">
                <p class="company">${esc(item.company)}</p>
                <h3>${esc(item.role)}</h3>
                ${cleanList(item.bullets)}
                ${chipList(item.tools)}
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderIndependentLab(copy) {
    $('#lab').innerHTML = `
      <div class="wrap lab-layout">
        <div class="lab-intro reveal">
          <p class="eyebrow">${esc(copy.independentLab.eyebrow)}</p>
          <h2 id="labTitle">${esc(copy.independentLab.title)}</h2>
          <p>${esc(copy.independentLab.subtitle)}</p>
          <small>${esc(copy.independentLab.note)}</small>
        </div>
        <div class="lab-list">
          ${copy.independentLab.cards.map((card) => `
            <article class="lab-item reveal">
              <h3>${esc(card.title)}</h3>
              <p>${esc(card.text)}</p>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderProjects(copy) {
    $('#projects').innerHTML = `
      <div class="wrap projects-wrap">
        ${sectionHead('projectsTitle', copy.projects.eyebrow, copy.projects.title, copy.projects.subtitle)}
        <div class="project-toolbar reveal">
          <p>${esc(copy.ui.projectRailHint)}</p>
        </div>
        <div class="project-rail-wrap">
          <button class="project-rail-button project-rail-button--prev" type="button" data-projects-prev aria-label="${esc(copy.ui.projectPrevious)}">‹</button>
          <div class="project-rail" data-projects-rail tabindex="0" aria-label="${esc(copy.projects.title)}">
            ${copy.projects.items.map((project) => projectCard(project, copy)).join('')}
          </div>
          <button class="project-rail-button project-rail-button--next" type="button" data-projects-next aria-label="${esc(copy.ui.projectNext)}">›</button>
        </div>
      </div>
    `;
  }

  function projectCard(project, copy) {
    return `
      <article class="project-card reveal">
        <div class="project-card__content">
          <div class="project-card__topline">
            <span>${esc(project.type)}</span>
            <strong>${esc(project.status)}</strong>
          </div>
          <h3>${esc(project.title)}</h3>
          <p>${esc(project.description)}</p>
          <div class="project-role">
            <span>${esc(copy.ui.roleLabel)}</span>
            <b>${esc(project.role)}</b>
          </div>
          ${cleanList(project.highlights)}
          ${chipList(project.tags)}
          <aside class="project-card__proof" aria-label="${esc(copy.ui.evidenceLabel)}">
            <span>${esc(copy.ui.evidenceLabel)}</span>
            <p>${esc(project.proof)}</p>
          </aside>
          ${project.buttons?.length ? `
            <div class="project-card__actions">
              ${project.buttons.map((button) => buttonLink(button)).join('')}
            </div>
          ` : ''}
        </div>
      </article>
    `;
  }

  function renderSkills(copy) {
    $('#skills').innerHTML = `
      <div class="wrap">
        ${sectionHead('skillsTitle', copy.skills.eyebrow, copy.skills.title, copy.skills.subtitle)}
        <div class="skills-grid">
          ${copy.skills.levels.map((group) => `
            <details class="skills-group reveal">
              <summary>
                <span class="skills-group__title">${esc(group.title)}</span>
                <span class="skills-group__preview">${group.items.slice(0, 4).map((item) => esc(item)).join(' / ')}</span>
                <span class="skills-group__more" aria-hidden="true">...</span>
              </summary>
              <div class="skill-chip-list">
                ${group.items.map((item) => `
                  <span class="skill-chip">${esc(item)}</span>
                `).join('')}
              </div>
            </details>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderValueAreas(copy) {
    $('#focus').innerHTML = `
      <div class="wrap">
        ${sectionHead('focusTitle', copy.valueAreas.eyebrow, copy.valueAreas.title, copy.valueAreas.subtitle)}
        <div class="value-list">
          ${copy.valueAreas.items.map((item, index) => `
            <article class="value-row reveal">
              <span class="row-index">${String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>${esc(item.title)}</h3>
                <p>${esc(item.text)}</p>
                ${chipList(item.tags)}
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderLearning(copy) {
    $('#certificates').innerHTML = `
      <div class="wrap">
        ${sectionHead('certificatesTitle', copy.learning.eyebrow, copy.learning.title, copy.learning.subtitle)}
        <div class="learning-groups">
          ${copy.learning.groups.map((group) => `
            <section class="learning-group reveal" aria-label="${esc(group.title)}">
              <h3>${esc(group.title)}</h3>
              <div class="learning-grid">
                ${group.items.map((item) => learningCard(item)).join('')}
              </div>
            </section>
          `).join('')}
        </div>
      </div>
    `;
  }

  function learningCard(item) {
    const mediaLabel = `${siteData[currentLanguage].ui.previewOpen}: ${item.title}`;
    return `
      <article class="learning-card">
        ${item.preview ? `
          <button class="learning-card__media" type="button" data-preview-src="${esc(item.preview)}" data-preview-title="${esc(item.title)}" aria-label="${esc(mediaLabel)}">
            <img class="learning-card__preview" src="${esc(item.preview)}" alt="${esc(`${item.title} - ${item.type}`)}" width="900" height="620" loading="lazy" />
          </button>
        ` : ''}
        <div class="learning-card__body">
          <p>${esc(item.type)}</p>
          <h4>${esc(item.title)}</h4>
          ${item.period ? `<strong>${esc(item.period)}</strong>` : ''}
          ${item.description ? `<span>${esc(item.description)}</span>` : ''}
        </div>
      </article>
    `;
  }

  function renderContact(copy) {
    $('#contact').innerHTML = `
      <div class="wrap contact-panel reveal">
        <div class="contact-panel__copy">
          <p class="eyebrow">${esc(copy.contact.eyebrow)}</p>
          <h2 id="contactTitle">${esc(copy.contact.title)}</h2>
          <p>${esc(copy.contact.text)}</p>
        </div>
        <div class="contact-panel__details" aria-label="${esc(copy.ui.detailsLabel)}">
          ${copy.contact.details.map((detail) => {
            const content = `
              <span>${esc(detail.label)}</span>
              <strong>${esc(detail.value)}</strong>
            `;
            return detail.href
              ? `<a class="contact-detail" href="${esc(detail.href)}"${linkAttrs(detail.href)}>${content}</a>`
              : `<div class="contact-detail">${content}</div>`;
          }).join('')}
        </div>
        <div class="contact-panel__actions">
          ${copy.contact.buttons.map((button) => buttonLink(button)).join('')}
        </div>
      </div>
    `;
  }

  function renderFooter(copy) {
    const navLinks = copy.nav.map(([label, href]) => `<a href="${esc(href)}">${esc(label)}</a>`).join('');
    const proofLinks = copy.footer.proofLinks.map(textLink).join('');
    const contactLinks = copy.footer.contactLinks.map(textLink).join('');

    $('#footer').innerHTML = `
      <div class="wrap footer__grid">
        <div>
          <h2>${esc(copy.person.nameEn)}</h2>
          <p>${esc(copy.footer.positioning)}</p>
          <p>${esc(copy.person.location)} · ${esc(copy.person.availability)}</p>
        </div>
        <div>
          <h3>${esc(copy.ui.footerNavigation)}</h3>
          ${navLinks}
        </div>
        <div>
          <h3>${esc(copy.ui.footerProof)}</h3>
          ${proofLinks}
        </div>
        <div>
          <h3>${esc(copy.ui.footerContact)}</h3>
          ${contactLinks}
        </div>
      </div>
      <div class="wrap footer__bottom">
        <span>${esc(copy.footer.bottom)}</span>
        <span>${esc(siteData.version)}</span>
      </div>
    `;
  }

  function setAboutGalleryIndex(index) {
    const items = galleryItems(siteData[currentLanguage]);
    if (!items.length) return;
    aboutGalleryIndex = (index + items.length) % items.length;

    const gallery = $('[data-about-gallery]');
    const image = $('[data-gallery-image]');
    if (!gallery || !image) return;

    const activeItem = items[aboutGalleryIndex];
    image.classList.remove('is-loaded');
    image.src = activeItem.src;
    image.alt = activeItem.alt;
    window.requestAnimationFrame(() => image.classList.add('is-loaded'));

    $$('[data-gallery-dot]', gallery).forEach((dot) => {
      dot.setAttribute('aria-pressed', String(Number(dot.dataset.galleryDot) === aboutGalleryIndex));
    });
  }

  function bindAboutGallery() {
    const gallery = $('[data-about-gallery]');
    if (!gallery) return;
    const items = galleryItems(siteData[currentLanguage]);
    if (items.length <= 1) return;

    $('[data-gallery-prev]', gallery)?.addEventListener('click', () => setAboutGalleryIndex(aboutGalleryIndex - 1));
    $('[data-gallery-next]', gallery)?.addEventListener('click', () => setAboutGalleryIndex(aboutGalleryIndex + 1));

    $$('[data-gallery-dot]', gallery).forEach((dot) => {
      dot.addEventListener('click', () => setAboutGalleryIndex(Number(dot.dataset.galleryDot)));
    });

    gallery.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setAboutGalleryIndex(aboutGalleryIndex - 1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setAboutGalleryIndex(aboutGalleryIndex + 1);
      }
    });

    let touchStartX = 0;
    gallery.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0]?.clientX ?? 0;
    }, { passive: true });
    gallery.addEventListener('touchend', (event) => {
      const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
      const delta = touchEndX - touchStartX;
      if (Math.abs(delta) < 48) return;
      setAboutGalleryIndex(aboutGalleryIndex + (delta < 0 ? 1 : -1));
    }, { passive: true });
  }

  function bindProjectRail() {
    const rail = $('[data-projects-rail]');
    if (!rail) return;
    const amount = () => {
      const card = $('.project-card', rail);
      const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap || '0') || 0;
      return card ? card.getBoundingClientRect().width + gap : Math.max(320, rail.clientWidth * 0.82);
    };

    const scrollLoop = (direction) => {
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      const next = rail.scrollLeft + amount() * direction;

      if (direction > 0 && next >= maxScroll - 8) {
        rail.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }

      if (direction < 0 && next <= 8) {
        rail.scrollTo({ left: maxScroll, behavior: 'smooth' });
        return;
      }

      rail.scrollTo({ left: next, behavior: 'smooth' });
    };

    $('[data-projects-prev]')?.addEventListener('click', () => scrollLoop(-1));
    $('[data-projects-next]')?.addEventListener('click', () => scrollLoop(1));
  }

  function ensurePreviewDialog() {
    let dialog = $('#previewDialog');
    const copy = siteData[currentLanguage];

    if (!dialog) {
      dialog = document.createElement('div');
      dialog.id = 'previewDialog';
      dialog.className = 'preview-dialog';
      dialog.setAttribute('role', 'dialog');
      dialog.setAttribute('aria-modal', 'true');
      dialog.setAttribute('aria-hidden', 'true');
      dialog.innerHTML = `
        <div class="preview-dialog__backdrop" data-preview-close></div>
        <div class="preview-dialog__panel">
          <button class="preview-dialog__close" type="button" data-preview-close></button>
          <img class="preview-dialog__image" alt="" />
          <p class="preview-dialog__title"></p>
        </div>
      `;
      document.body.append(dialog);
    }

    const closeButton = $('.preview-dialog__close', dialog);
    closeButton.setAttribute('aria-label', copy.ui.previewClose);
    closeButton.textContent = '×';
    return dialog;
  }

  function openPreview(src, title) {
    const dialog = ensurePreviewDialog();
    const image = $('.preview-dialog__image', dialog);
    const caption = $('.preview-dialog__title', dialog);

    image.src = src;
    image.alt = title;
    caption.textContent = title;
    dialog.setAttribute('aria-hidden', 'false');
    dialog.classList.add('is-open');
    document.body.classList.add('preview-open');
    $('.preview-dialog__close', dialog)?.focus();
  }

  function closePreview() {
    const dialog = $('#previewDialog');
    if (!dialog) return;
    dialog.classList.remove('is-open');
    dialog.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('preview-open');
  }

  function bindPreviewDialog() {
    document.addEventListener('click', (event) => {
      const previewButton = event.target.closest('[data-preview-src]');
      if (previewButton) {
        openPreview(previewButton.dataset.previewSrc, previewButton.dataset.previewTitle || '');
        return;
      }

      if (event.target.closest('[data-preview-close]')) {
        closePreview();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closePreview();
    });
  }

  function bindReveal() {
    const items = $$('.reveal');

    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }

    items.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index * 36, 260)}ms`);
    });

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach((item) => revealObserver.observe(item));
  }

  function bindStaticEvents() {
    const menuToggle = $('#menuToggle');
    const nav = $('#mainNav');
    const languageSwitch = $('#languageSwitch');

    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        const copy = siteData[currentLanguage];
        const isOpen = document.body.classList.toggle('nav-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? copy.ui.closeMenu : copy.ui.openMenu);
      });
    }

    if (nav) {
      nav.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
          document.body.classList.remove('nav-open');
          if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', siteData[currentLanguage].ui.openMenu);
          }
        }
      });
    }

    if (languageSwitch) {
      languageSwitch.addEventListener('click', (event) => {
        const button = event.target.closest('[data-language]');
        if (!button) return;
        setLanguage(button.dataset.language);
      });
    }

    document.addEventListener('click', (event) => {
      const emailButton = event.target.closest('[data-copy-email]');
      if (emailButton) {
        copyEmail(emailButton);
        return;
      }

      const phoneButton = event.target.closest('[data-copy-phone]');
      if (phoneButton) {
        copyPhone(phoneButton);
      }
    });
  }

  function render() {
    const copy = siteData[currentLanguage];
    updateDocument(copy);
    renderHeader(copy);
    renderHero(copy);
    renderAbout(copy);
    renderExperience(copy);
    renderIndependentLab(copy);
    renderProjects(copy);
    renderSkills(copy);
    renderValueAreas(copy);
    renderLearning(copy);
    renderContact(copy);
    renderFooter(copy);
    bindAboutGallery();
    bindProjectRail();
    bindReveal();
  }

  bindStaticEvents();
  bindPreviewDialog();
  render();
})();
