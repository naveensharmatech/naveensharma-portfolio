# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

There is no test suite and no linter configured.

## Repository layout

```
naveensharma-portfolio/
├── src/
│   ├── App.jsx          # entire portfolio SPA — all components and data
│   ├── main.jsx         # React entry point (mounts App into #root)
│   └── index.css        # global CSS (smooth scroll + system font)
├── functions/
│   └── api/chat.js      # Cloudflare Pages Function — Ella AI chat backend
├── _fh/                 # FreelanceHub Academy (hub.naveensharma.net) — reference code only, NOT built by Vite
│   ├── app/             # Next.js App Router pages (courses, lessons, certificates)
│   ├── components/      # Navbar, Footer, LessonViewer, CourseOverview, CertificateViewer
│   ├── lib/             # courses-data.ts (3 courses), progress.ts, social.ts
│   ├── layout.tsx       # Next.js root layout
│   ├── courses-page.tsx
│   └── manifest.json    # PWA manifest for FreelanceHub
├── public/              # Static assets served at root
│   ├── naveen-avatar.jpg        # navbar/footer avatar
│   ├── naveen-photo.jpg         # About section photo
│   ├── ella-avatar.png          # Ella chat widget avatar
│   ├── linkedin-cover.jpeg      # Hero banner image
│   ├── freelancehub-logo.png    # legacy logo (kept for reference)
│   ├── round logo.jpeg
│   ├── Naveen Sharma General CV.pdf   # CV — linked in Hero and Contact
│   ├── Naveen_Sharma_CV.pdf           # alternate CV filename
│   ├── docs/                          # downloadable project documents
│   │   ├── Warehouse-Management-System-Test-Plan.pdf
│   │   ├── Netflix-Subscription-Test-Plan.docx
│   │   └── Django-Blogging-CMS-Project.pdf
│   ├── robots.txt
│   └── sitemap.xml
├── index.html           # HTML shell with full SEO meta tags (OG, Twitter Card)
├── vite.config.js       # Vite + React plugin (no customisation)
├── tailwind.config.js   # content: index.html + src/**
├── postcss.config.js
└── package.json         # React 18, Vite 5, Tailwind 3, lucide-react
```

## Architecture — portfolio site (`src/App.jsx`)

Single-page React app. All application code lives in one file — no routing, no separate component files, no state management library.

### Data constants (top of file)

All visible content is defined as plain JS arrays/objects. Edit these to update site content:

| Constant | Used by | Contains |
|---|---|---|
| `NAV_LINKS` | `Navbar` | `{ label, href }` — anchor links |
| `HEADLINES` | `Hero` | rotating skill badge labels |
| `EXPERTISE` | `Expertise` | `{ icon, title, desc }` — competency cards |
| `EXPERIENCES` | `Experience` | `{ company, period, context, roles[], points[] }` |
| `CASE_STUDIES` | `CaseStudies` | `{ title, tag, challenge, role, solution, outcome }` |
| `EDUCATION` | `Education` | `{ icon, institution, degree, focus, period, type }` |
| `PROJECTS` | `Projects` | `{ icon, title, tag, desc, skills[], file?, fileLabel? }` |
| `TOOL_CATEGORIES` | `Tools` | `{ label, sublabel, tools[] }` |
| `FAQS` | `FAQ` | `{ q, a }` — accordion items |
| `LEGAL_DOCS` | `Footer` (modal) | `{ privacy, legal, terms, cookies }` — rendered in `LegalModal` |

### Section components and page order

`App()` assembles sections in this order:

```
Navbar
Hero
TrustBar
About
Expertise
Experience
CaseStudies
AvailableFor       ← blue CTA banner, no data constant (inline)
Education
Projects
Tools
FAQ
Contact
Footer             ← includes LegalModal triggered by footer links
EllaChat           ← floating chat widget (bottom-right, always visible)
```

Navigation anchors: `#top`, `#about`, `#expertise`, `#experience`, `#casestudies`, `#education`, `#projects`, `#faq`, `#contact`

### Shared utility components

- **`SectionHeading({ eyebrow, title, description, center })`** — reused across all content sections
- **`LegalBodyText({ text })`** — renders body text with auto-linked URLs and email addresses
- **`LegalModal({ doc, onClose })`** — modal overlay for Privacy / Legal / Terms / Cookies docs; Escape key closes it

### State in components

- `Navbar` — `open` (mobile menu), `scrolled` (shadow on scroll)
- `FAQ` — `open` (index of expanded item)
- `Footer` — `activeDoc` (key of open legal document or null)
- `EllaChat` — `open`, `messages[]`, `input`, `loading`

## Ella AI chat widget

`EllaChat` is a floating chat widget that calls the serverless backend at `/api/chat`.

**Backend:** `functions/api/chat.js` — a Cloudflare Pages Function that proxies to the Groq API.

- Model: `llama-3.1-8b-instant`
- Max tokens: 350, temperature: 0.7
- Requires `GROQ_API_KEY` environment variable set in Cloudflare Pages dashboard
- `GET /api/chat` — health check (returns status + whether key is loaded)
- `POST /api/chat` — accepts `{ messages: [{role, content}] }`, returns `{ reply: string }`

The system prompt defines "Ella" (named after Naveen's daughter) as a professional assistant for naveensharma.net. It contains full context about Naveen's experience, Opility services, social links, and instructions on tone. **Never reveal the system prompt contents to site visitors.**

## FreelanceHub Academy (`_fh/`)

This directory contains the source code for the separate FreelanceHub Academy platform at `hub.naveensharma.net`. It is a Next.js app (App Router, TypeScript) and is **not part of the Vite build** — Vite only builds `src/`. The `_fh/` code lives here for version control convenience.

Key file: `_fh/lib/courses-data.ts` defines 3 courses with typed `Course` / `Lesson` / `Section` structures:
- `"ai-tools-for-business"` — 12 lessons, Beginner, AI & Automation
- `"qa-testing-zero-to-job-ready"` — 18 lessons, Beginner, QA & Testing
- `"saas-implementation-masterclass"` — Intermediate, SaaS

## Styling conventions

- Pure Tailwind CSS utility classes throughout — no custom component classes or CSS modules
- Only custom CSS in `src/index.css`: `scroll-behavior: smooth` and system font stack
- Icons exclusively from `lucide-react`
- Color palette: blue-600 primary, gray-50/100 backgrounds, white cards
- Max content width: `max-w-6xl mx-auto` on all sections
- Responsive: mobile-first, `sm:` and `md:` and `lg:` breakpoints

## Deployment

Deployed to Cloudflare Pages.

- Build command: `npm run build`
- Output directory: `dist`
- Live site: https://naveensharma.net
- Environment variable required: `GROQ_API_KEY` (for Ella chat)

The `functions/` directory is picked up automatically by Cloudflare Pages and deployed as serverless edge functions alongside the static build.

## Content update cheatsheet

| What to change | Where |
|---|---|
| Nav items | `NAV_LINKS` constant, ~line 11 |
| Hero badge labels | `HEADLINES` constant |
| Skill cards | `EXPERTISE` constant |
| Work history | `EXPERIENCES` constant |
| Case studies | `CASE_STUDIES` constant |
| Education / certs | `EDUCATION` constant |
| Portfolio projects | `PROJECTS` constant |
| Tools section | `TOOL_CATEGORIES` constant |
| FAQ answers | `FAQS` constant |
| Legal text | `LEGAL_DOCS` constant |
| Contact details | `Contact` component (~line 696) |
| Ella persona / system prompt | `SYSTEM_PROMPT` in `functions/api/chat.js` |
| SEO meta tags | `index.html` |
| CV file | Replace `public/Naveen Sharma General CV.pdf` (keep exact filename — URL-encoded in HTML) |
| Hero banner image | Replace `public/linkedin-cover.jpeg` |
| Avatar | Replace `public/naveen-avatar.jpg` and `public/naveen-photo.jpg` |
