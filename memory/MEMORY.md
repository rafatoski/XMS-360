# XMS-360 Project Memory

## Project Overview
- **Name:** XMS-360 — XMS AI Marketing Platform landing page
- **Stack:** Astro 5 + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion
- **URL:** https://xperienceaimarketing.com
- **Type:** Single-page marketing/SaaS landing page

## Key Architecture
- Single route: `src/pages/index.astro`
- React islands with `client:load` / `client:visible`
- Dark-mode only (hardcoded `class="dark"` on html)
- Tailwind v4 via Vite plugin (NOT postcss)
- Custom fonts: Syne (headings), DM Sans (body)

## Active Component Order (index.astro)
1. Header.tsx (client:load)
2. GlassHero.tsx (client:load) — primary hero
3. VideoSection.astro — YouTube embed
4. PainPoints.astro
5. ModernTools.tsx (client:visible) — infinite marquee
6. Industries.astro
7. Testimonials.astro
8. FAQ.tsx (client:visible)
9. CTA.astro
10. Footer.astro

## Fixed Issues (session Feb 2026)
1. ContactForm integrated with Web3Forms — needs WEB3FORMS_ACCESS_KEY replaced
2. Certification logos downloaded to /public/brand/ (meta-partner.png, google-ads-partner.png, google-certified.png)
3. All CTA buttons now link to #contact
4. Hero "Explore Ecosystem" button links to #tools
5. ContactForm added to index.astro (was missing)
6. Plausible Analytics added to <head>
7. Dead components deleted: Hero.tsx, Ecosystem.tsx, Methodology.astro, BentoFeatures.astro, Tools.astro, AnimatedSection.tsx

## Pending Action (user must do)
- Get Web3Forms access key at https://web3forms.com and replace YOUR_WEB3FORMS_ACCESS_KEY in ContactForm.tsx:8

## User Preferences
- Language: Spanish (user communicates in Spanish)
