# Yash Bharani · Portfolio

Angular 22 site built from the Claude Design file. Every page is **prerendered to static HTML** at build time, so it's fast, SEO-friendly, and hosts on Firebase Hosting with no server.

## Run locally

```bash
npm install
npm start            # http://localhost:4200 (live reload)
```

## Where things live

| What | File |
|---|---|
| All text, links, projects, case-study content | `src/app/data/site.ts` |
| Colours, fonts, light/dark theme values | `src/styles/tokens.css` |
| Home page sections | `src/app/pages/home/` (`hero-card`, `featured-projects`, `timeline`, `contact`) |
| Case-study template (`/work/:slug`) | `src/app/pages/case-study/` |
| About page | `src/app/pages/about/about.ts` |
| Images / fonts / resume | `public/images`, `public/fonts`, `public/resume.pdf` |

**Add a project:** add an entry to `PROJECTS` in `site.ts`. It gets a page at `/work/<slug>` automatically and is prerendered. Set `featured: true` to show it in the home page stack.

## Before going live (TODOs)

- [ ] Put your resume at `public/resume.pdf`. The Dropbox link in the design was a temporary download URL.
- [ ] Behance link in `SOCIALS` currently points to GitHub (same as the design).
- [ ] Project covers: add images to `public/images/` and set `cover` on each project. `cover-motor.png` wasn't in the design export.
- [ ] Projects 02 and 03 reuse Motor Insurance's tags and description (same as the design).
- [ ] Case-study and About copy (search for `TODO`).
- [ ] Set `SITE_URL` in `src/app/core/seo.service.ts` to your domain.

## Preview on GitHub Pages

Every push to `main` builds the site and publishes it to **https://yhbharani.github.io/YHBWebsite2026/** (see `.github/workflows/deploy-pages.yml`).

One-time setup: on GitHub, go to repo **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

To build the Pages version locally: `npm run build:gh` (output is in `dist/portfolio/browser`).

> Paths in the code are written without a leading slash (`images/...`, not `/images/...`) so the same build works both at the domain root (Firebase) and under `/YHBWebsite2026/` (GitHub Pages). Keep new image paths in that format.

## Deploy to Firebase

```bash
npm install -g firebase-tools
firebase login
firebase use --add            # pick your existing Firebase project (updates .firebaserc)
npm run deploy                # = ng build && firebase deploy --only hosting
```

**Preview before replacing the live site:**

```bash
npm run build
firebase hosting:channel:deploy preview    # gives a temporary URL
```

**Custom domain:** in the Firebase console, go to Hosting → *Add custom domain*. Add the TXT and A records it shows at your domain registrar. SSL is set up automatically, and it can take a few hours to go live.
