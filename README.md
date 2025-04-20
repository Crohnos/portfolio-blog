# Portfolio Blog

This is my personal portfolio and blog website built with Astro, showcasing my projects and technical writing.

## Template: AstroPaper 📄

This site is based on [AstroPaper](https://github.com/satnaing/astro-paper), a minimal, responsive, accessible and SEO-friendly Astro blog theme.

![AstroPaper](public/astropaper-og.jpg)

## 🔥 Features

- [x] type-safe markdown
- [x] super fast performance
- [x] accessible (Keyboard/VoiceOver)
- [x] responsive (mobile ~ desktops)
- [x] SEO-friendly
- [x] light & dark mode
- [x] fuzzy search
- [x] draft posts & pagination
- [x] sitemap & rss feed
- [x] followed best practices
- [x] highly customizable
- [x] dynamic OG image generation for blog posts

## ✅ Lighthouse Score

<p align="center">
  <a href="https://pagespeed.web.dev/report?url=https%3A%2F%2Fastro-paper.pages.dev%2F&form_factor=desktop">
    <img width="710" alt="AstroPaper Lighthouse Score" src="AstroPaper-lighthouse-score.svg">
  <a>
</p>

## 🚀 Project Structure

Inside of this project, you'll see the following folders and files:

```bash
/
├── public/
│   ├── assets/
│   └── favicon.svg
│   └── astropaper-og.jpg
│   └── toggle-theme.js
├── src/
│   ├── assets/
│   │   └── icons/
│   │   └── images/
│   ├── components/
│   ├── content/
│   │   └── blog/
│   │       └── articles/
│   │       └── personal/
│   │       └── projects/
│   │       └── tutorials/
│   ├── layouts/
│   └── pages/
│   └── styles/
│   └── utils/
│   └── config.ts
│   └── constants.ts
│   └── content.config.ts
└── astro.config.ts
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                                                                                   |
| :--------------------- | :------------------------------------------------------------------------------------------------------- |
| `npm install`          | Installs dependencies                                                                                    |
| `npm run dev`          | Starts local dev server at `localhost:4321`                                                              |
| `npm run build`        | Build your production site to `./dist/`                                                                  |
| `npm run preview`      | Preview your build locally, before deploying                                                             |
| `npm run format:check` | Check code format with Prettier                                                                          |
| `npm run format`       | Format codes with Prettier                                                                               |
| `npm run lint`         | Lint with ESLint                                                                                         |

## 📜 License

- Original AstroPaper theme is licensed under the MIT License, Copyright © 2025 by [Sat Naing](https://satnaing.dev)
- Portfolio blog content is licensed under [appropriate license]

---

Built with Astro and the AstroPaper theme.