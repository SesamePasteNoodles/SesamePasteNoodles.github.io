# Randy Chen — Developer Portfolio

Personal developer portfolio showcasing verified software engineering projects, system architecture decisions, and in-depth technical case studies.

Designed with **Deep Navy × Modern Bauhaus × Vercel-like Readability**, emphasizing dark mode typography, high-contrast engineering grids, keyboard navigation, and responsive precision.

- 🔗 **Live Site**: [https://sesamepastenoodles.github.io/](https://sesamepastenoodles.github.io/)
- 🐙 **GitHub**: [https://github.com/SesamePasteNoodles](https://github.com/SesamePasteNoodles)
- ✉️ **Email**: `randy861028@gmail.com`（網站內點擊即可複製）

---

## 🛠️ Technology Stack

- **Framework**: Vue 3 (Composition API with `<script setup>`)
- **Language**: TypeScript & Vue TSC
- **Build Tool**: Vite
- **Routing**: Vue Router 5 (`createWebHashHistory`)
- **Styling**: Vanilla CSS, CSS Grid & CSS Custom Properties (Variables)
- **CI/CD & Deployment**: GitHub Actions & GitHub Pages
- **Validation**: ESLint, Vue-TSC, Production Build Smoke Checks

---

## 💻 Local Development & Verification

Ensure Node.js (v24 or compatible) is installed.

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run ESLint validation
npm run lint

# Run TypeScript type check
npm run type-check

# Build production bundle
npm run build

# Preview production build locally
npm run preview

# Run production build smoke check
npm run test:smoke
```

---

## 🚀 GitHub Pages & Routing

This site is deployed to GitHub Pages via an automated GitHub Actions workflow (`.github/workflows/deploy.yml`).

- **Router Mode**: Vue Router Hash History (`createWebHashHistory`). Hash Routing avoids 404 errors when deep-linking directly to project case studies on GitHub Pages static file hosting.
- **Base Path**: Root `/` (configured for GitHub User Pages `SesamePasteNoodles.github.io`).
- **Metadata & Open Graph**: Dynamic document title, meta description, canonical link, and social sharing Open Graph tags are managed centrally (`src/config/site.ts`) and updated on every route transition (`src/composables/useMeta.ts`).

---

## 📄 License & Content Policy

- Source code is distributed under the [MIT License](./LICENSE).
- Personal details, résumé content, branding icons, project screenshots, and case study media are reserved under private copyright and excluded from the MIT License. See [NOTICE.md](./NOTICE.md) for complete details.
