# Konstantin Vasiliev Portfolio v5.1.0

Static one-page portfolio for AI QA / LLM Evaluation / Integration Support / QA Web/API / Unity Game QA positioning.

## v5.1.0

This release continues the full visual redesign with a more human resume-style structure.

- Reordered sections: About, Experience, Practice, Projects, Skills, Focus, Learning, Contact.
- Rewritten RU / US copy in a more direct and human tone.
- Added About photo gallery with arrows, dots, keyboard support, and mobile swipe.
- Rebuilt Projects as a horizontal scroll rail with snap and compact evidence blocks.
- Rebuilt Skills as three practical levels: core, working, learning.
- Rebuilt Learning as certificates, education, and achievements.
- Added phone, salary expectations, format, location, goal, and English level to the contact CTA.
- Added `pismo-arm.webp` preview for the military service recommendation.
- Cleaned long dash characters from text files.
- Added RU / US language switch without page reload.
- Language choice is saved in `localStorage` with key `kv-site-language`.

The project is static. There is no React, Vite, npm, or build step.

## Local Run

```bash
python -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173/
```

## Content

Main content, links, localized RU / US copy, project data, certificate data, and footer links live here:

```text
assets/js/profile-data.js
```

The data shape is:

```text
window.profileData = {
  ru: {},
  us: {},
  links: {},
  assets: {}
}
```

The renderer lives here:

```text
assets/app.js
```

The visual system lives here:

```text
assets/style.css
```

## Language Switch

The header contains a segmented `RU / US` control.

- RU is the default language.
- Saved language key: `kv-site-language`.
- Saved values: `ru` / `us`.
- Switching updates page copy, navigation, buttons, footer, alt text, document language, title, and meta description.

## Photos

Photo assets:

```text
images/konstantin-hero.webp
images/konstantin-about.webp
images/konstantin-avatar.webp
images/og-cover.webp
images/about/about-1.webp
images/about/about-2.webp
images/about/about-3.webp
images/about/about-4.webp
```

Use optimized WebP where possible. Keep natural portrait framing and avoid aggressive face cropping.

## CV

CV files:

```text
cv/Konstantin_Vasiliev_CV_RU.pdf
cv/Konstantin_Vasiliev_CV_EN.pdf
```

## Certificates

Certificate files:

```text
certificates/ai-foundations.pdf
certificates/ai-foundations.webp
certificates/agents-workflows.png
certificates/agents-workflows.webp
```

Rules:

- Do not show raw filenames in the UI.
- Use human-readable titles: `Основы ИИ` / `AI Foundations`, `Агенты и рабочие процессы` / `Agents and Workflows`.
- Certificate cards use previews without status labels or open buttons.
- Do not show planned or optional certificates unless real files exist.
- Course completion certificates must not be presented as professional certifications.

## Achievements

Achievement preview files:

```text
images/achievements/pismo-arm.webp
```

## Documents

Project documents:

```text
documents/svoya-masterskaya.pdf
```

## Links

Important public links:

```text
https://www.rustore.ru/catalog/app/com.mellstroy.clicker
https://qa-api-lab.onrender.com
https://github.com/Kezerio
```

Do not render:

- empty `href="#"` links
- visible placeholder links
- Unity page links without a real URL
- old self-reference to the current portfolio

## Checks

Use bundled Node if system `node` is unavailable.

```bash
node --check assets/app.js
node --check assets/js/profile-data.js
git diff --check
```

Serve locally and verify these paths return `200`:

```text
/
/assets/style.css
/assets/app.js
/assets/js/profile-data.js
/images/konstantin-hero.webp
/images/konstantin-about.webp
/images/konstantin-avatar.webp
/images/og-cover.webp
/images/about/about-1.webp
/images/about/about-2.webp
/images/about/about-3.webp
/images/about/about-4.webp
/images/achievements/pismo-arm.webp
/cv/Konstantin_Vasiliev_CV_RU.pdf
/cv/Konstantin_Vasiliev_CV_EN.pdf
/documents/svoya-masterskaya.pdf
/certificates/ai-foundations.pdf
/certificates/ai-foundations.webp
/certificates/agents-workflows.png
/certificates/agents-workflows.webp
```

Recommended viewport checks:

```text
360px
768px
1280px
1440px
```

Also verify:

- RU / US switch works without reload.
- `document.documentElement.lang` changes.
- Language selection persists after reload.
- No horizontal scroll on mobile.
- About gallery arrows, dots, keyboard navigation, and mobile swipe work.
- Projects rail scrolls horizontally and keeps equal card heights.
- Certificate previews load.
- Learning contains certificates, education, and achievements.
- Project 67 has no active external link.
- Old QA Portfolio and AI Lab discussion links are absent.
- No long dash or en dash characters are present.

## Deploy To GitHub Pages

```bash
git status
git diff --stat
git add .
git commit -m "Release portfolio v5.0.0"
git push
```

GitHub Pages should serve the static files from the configured branch/root.

## Privacy Notes

- The site publishes the public phone number provided for contact.
- Private automation, client, token, login, account, and internal URL data must stay out of public assets.
- Do not publish private screenshots, cookies, tokens, or account-specific URLs.
