# Konstantin Vasiliev Portfolio v7.0.0

Static bilingual portfolio for AI Product, AI-assisted QA, technical support, integration support, Web/API practice, and Android projects.

## Humanizm release

- Keeps the Human in Motion editorial identity, warm photography, kinetic tickers, and desktop motion.
- Puts verified commercial experience before projects and personal information.
- Uses the current resume facts only. Warehouse work and unsupported LLM Evaluator positioning are not part of the main site.
- Shows skill levels as commercial, project, and beginner.
- Describes API practice with methods, headers, status codes, negative checks, boundary checks, and test counts.
- Adds a light full-screen route menu, RU / EN switching, responsive layouts, and a back-to-top control.
- Updates both RU and EN PDF resumes.
- Adds a bilingual privacy page and an informational localStorage notice.

The project is static. There is no React, Vite, npm, or build step.

## Local run

```bash
python -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

## Main files

```text
index.html
assets/humanizm.css
assets/human-in-motion.js
assets/desktop-motion.css
assets/desktop-motion.js
privacy/index.html
privacy/privacy.css
privacy/privacy.js
```

Other public sections:

```text
cases/
api-lab/
concepts/
```

## Language

- RU is the default.
- The `?lang=ru` and `?lang=en` query parameters are supported.
- A user-selected language is saved as `kv-site-language` in localStorage.
- Internal links preserve the selected language.
- The privacy page and downloadable CV are localized.

## CV

```text
cv/Konstantin_Vasiliev_CV_RU.pdf
cv/Konstantin_Vasiliev_CV_EN.pdf
```

Both files reflect the current AI Product Specialist / AI-Assisted QA resume and contain no warehouse role, named relocation destination, or unsupported commercial LLM evaluation claim.

## Privacy and data flow

- The site code has no registration, contact form, advertising, analytics, or tracking pixels.
- The main site stores only language preference and notice acknowledgement in localStorage.
- GitHub Pages logs visitor IP addresses for security according to GitHub documentation.
- Opening the API Lab gate sends a GET health request to `qa-api-lab.onrender.com` to wake the demo and show its status.
- External Telegram, RuStore, Google Drive, Mail.ru, and similar pages open only after a link action.
- Re-audit the privacy notice before adding forms, analytics, advertising, embeds, or new external requests.

## Checks

```bash
node --check assets/human-in-motion.js
node --check assets/desktop-motion.js
node --check privacy/privacy.js
node --check api-lab/api-lab.js
git diff --check
```

Serve locally and verify these paths return `200`:

```text
/
/privacy/
/cases/
/api-lab/
/assets/humanizm.css
/assets/human-in-motion.js
/cv/Konstantin_Vasiliev_CV_RU.pdf
/cv/Konstantin_Vasiliev_CV_EN.pdf
```

Recommended viewport checks:

```text
360px
390px
720px
1024px
1440px
```

Verify that:

- there is no horizontal overflow;
- text does not overlap at narrow widths or the 200 percent zoom equivalent;
- the route menu opens, closes, and lands below the sticky header;
- RU and EN have no mixed-language interface copy;
- images and certificate previews load;
- all `target="_blank"` links use `rel="noopener noreferrer"`;
- API Lab opens in a new tab and its direct button opens the Render URL without a language query;
- reduced-motion preferences disable non-essential motion;
- no long dash or en dash characters are introduced in public text files.

## Deploy to GitHub Pages

```bash
git status
git diff --stat
git add .
git commit -m "Rebrand portfolio in Humanizm style"
git push
```

GitHub Pages serves the static files from the configured branch and repository root.
