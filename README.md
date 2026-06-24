# Konstantin Vasiliev Portfolio v5.0.0

Static one-page portfolio for AI QA / LLM Evaluation / Integration Support / QA Web/API / Unity Game QA positioning.

## v5.0.0

This release is a full visual redesign, not a small polish pass.

- New `Midnight Editorial Portfolio` design system.
- Calm graphite / warm black palette with muted brass and glacier accents.
- Rebuilt buttons, typography, spacing, section rhythm, project cards, experience rows, skills groups, certificates, contact panel, and footer.
- Added RU / US language switch without page reload.
- Language choice is saved in `localStorage` with key `kv-site-language`.
- Removed old self-referencing QA Portfolio links, empty links, placeholder links, and the old AI Lab discussion button.
- Mell Clicker now uses the real RuStore link.
- Project 67 is shown as in development with a disabled label.
- Certificates use safe filenames and real previews.

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
- PDF certificates can use a generated preview image plus a button to open the PDF.
- PNG certificates can use the PNG as the source and a generated WebP preview for the card.
- Do not show planned or optional certificates unless real files exist.
- Course completion certificates must not be presented as professional certifications.

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
- Certificate previews load.
- Project 67 has no active external link.
- Old QA Portfolio and AI Lab discussion links are absent.

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

- The site does not publish phone numbers.
- Private automation, client, token, login, account, and internal URL data must stay out of public assets.
- Do not publish private screenshots, cookies, tokens, or account-specific URLs.
