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
    if (!href || href.startsWith('#') || href.startsWith('mailto:')) return '';
    return ' target="_blank" rel="noopener noreferrer"';
  }

  function buttonLink(item, fallbackVariant = 'secondary') {
    const variant = item.variant || fallbackVariant;
    const className = `btn btn--${variant}`;

    if (item.action === 'copyEmail') {
      return `<button class="${className}" type="button" data-copy-email>${esc(item.label)}</button>`;
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
        <p>${esc(subtitle)}</p>
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

  async function copyEmail() {
    const copy = siteData[currentLanguage];
    const email = siteData.links.emailText;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.append(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
    } catch {
      // The toast still gives a clear click response if clipboard access is blocked.
    }

    const toast = ensureToast();
    toast.textContent = copy.ui.emailCopied;
    toast.classList.add('is-visible');
    window.clearTimeout(copyEmail.hideTimer);
    copyEmail.hideTimer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 1300);
  }

  function renderHeader(copy) {
    const skipLink = $('.skip-link');
    if (skipLink) skipLink.textContent = copy.ui.skipLink;

    const brand = $('.brand');
    if (brand) brand.setAttribute('aria-label', copy.ui.brandAria);

    const brandName = $('[data-brand-name]');
    if (brandName) brandName.textContent = copy.person.nameEn;

    const brandRole = $('[data-brand-role]');
    if (brandRole) brandRole.textContent = 'AI QA / Integration Support';

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
          <div class="hero__actions">
            ${copy.hero.cta.map((item) => buttonLink(item)).join('')}
          </div>
          <div class="proof-list" aria-label="${esc(copy.ui.evidenceLabel)}">
            ${copy.hero.proofPoints.map((item) => `<span>${esc(item)}</span>`).join('')}
          </div>
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

  function renderAbout(copy) {
    $('#about').innerHTML = `
      <div class="wrap about-layout">
        <div class="about-copy reveal">
          <p class="eyebrow">${esc(copy.about.eyebrow)}</p>
          <h2 id="aboutTitle">${esc(copy.about.title)}</h2>
          <div class="rich-text">
            ${copy.about.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}
          </div>
        </div>
        <div class="about-visual reveal">
          <img src="${esc(siteData.assets.aboutImage)}" alt="${esc(copy.about.imageAlt)}" width="980" height="1280" loading="lazy" />
          <div class="about-notes">
            ${copy.about.notes.map((note) => `<span>${esc(note)}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderValueAreas(copy) {
    $('#focus').innerHTML = `
      <div class="wrap">
        ${sectionHead('focusTitle', 'Focus', copy.valueAreas.title, copy.valueAreas.subtitle)}
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

  function renderExperience(copy) {
    $('#experience').innerHTML = `
      <div class="wrap">
        ${sectionHead('experienceTitle', 'Experience', copy.experience.title, copy.experience.subtitle)}
        <div class="experience-list">
          ${copy.experience.items.map((item) => `
            <article class="experience-row ${item.current ? 'experience-row--current' : ''} reveal">
              <div class="experience-row__meta">
                <span>${esc(item.period)}</span>
                ${item.location ? `<small>${esc(item.location)}</small>` : ''}
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
      <div class="wrap">
        ${sectionHead('projectsTitle', 'Projects', copy.projects.title, copy.projects.subtitle)}
        <div class="project-grid">
          ${copy.projects.items.map((project, index) => projectCard(project, copy, index)).join('')}
        </div>
      </div>
    `;
  }

  function projectCard(project, copy, index) {
    const featured = index === 0 ? ' project-card--featured' : '';
    return `
      <article class="project-card${featured} reveal">
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
          ${project.buttons?.length ? `
            <div class="project-card__actions">
              ${project.buttons.map((button) => buttonLink(button)).join('')}
            </div>
          ` : ''}
        </div>
        <aside class="project-card__proof" aria-label="${esc(copy.ui.evidenceLabel)}">
          <span>${esc(copy.ui.evidenceLabel)}</span>
          <p>${esc(project.proof)}</p>
        </aside>
      </article>
    `;
  }

  function renderSkills(copy) {
    $('#skills').innerHTML = `
      <div class="wrap">
        ${sectionHead('skillsTitle', 'Skills', copy.skills.title, copy.skills.subtitle)}
        <div class="skills-grid">
          ${copy.skills.groups.map((group) => `
            <article class="skills-group reveal">
              <h3>${esc(group.title)}</h3>
              ${chipList(group.items, 'chip-list chip-list--dense')}
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderCertificates(copy) {
    $('#certificates').innerHTML = `
      <div class="wrap">
        ${sectionHead('certificatesTitle', 'Learning', copy.certificates.title, copy.certificates.subtitle)}
        <div class="cert-grid">
          ${copy.certificates.items.map((certificate) => `
            <article class="cert-card reveal">
              <img class="cert-card__preview" src="${esc(certificate.preview)}" alt="${esc(`${certificate.title} — ${certificate.type}`)}" width="900" height="620" loading="lazy" />
              <div class="cert-card__body">
                <h3>${esc(certificate.title)}</h3>
                <p>${esc(certificate.type)}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderContact(copy) {
    $('#contact').innerHTML = `
      <div class="wrap contact-panel reveal">
        <div>
          <p class="eyebrow">Contact</p>
          <h2 id="contactTitle">${esc(copy.contact.title)}</h2>
          <p>${esc(copy.contact.text)}</p>
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

  function bindReveal() {
    const items = $$('.reveal');

    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }

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
      if (event.target.closest('[data-copy-email]')) {
        copyEmail();
      }
    });
  }

  function render() {
    const copy = siteData[currentLanguage];
    updateDocument(copy);
    renderHeader(copy);
    renderHero(copy);
    renderAbout(copy);
    renderValueAreas(copy);
    renderExperience(copy);
    renderIndependentLab(copy);
    renderProjects(copy);
    renderSkills(copy);
    renderCertificates(copy);
    renderContact(copy);
    renderFooter(copy);
    bindReveal();
  }

  bindStaticEvents();
  render();
})();
