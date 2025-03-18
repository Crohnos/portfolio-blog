# Portfolio Blog

A simple portfolio and blog site built with Express.js that can be deployed as a static site to GitHub Pages.

## Features

- Server-side API for local development
- Static site generation for GitHub Pages deployment
- Responsive design with Pico CSS
- Markdown blog posts with front matter

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

The site will be available at http://localhost:3000.

### Production

Start the production server:

```bash
npm start
# or
yarn start
```

## Adding Blog Posts

Add new blog posts to the `posts` directory as markdown files with front matter:

```markdown
---
title: My New Post
date: 2023-10-03
---
Your content here...
```

## Technologies Used

- Express.js - Backend server (for development)
- gray-matter - YAML front matter parser
- marked - Markdown parser
- Pico CSS - Lightweight CSS framework

## Deployment to GitHub Pages

1. Create a GitHub repository:
   ```
   git remote add origin https://github.com/Crohnos/portfolio-blog.git
   ```

2. Commit your changes:
   ```
   git add .
   git commit -m "Initial commit"
   ```

3. Push to GitHub:
   ```
   git push -u origin master
   ```

4. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

5. Configure GitHub Pages:
   - Go to your repository settings on GitHub
   - Under "GitHub Pages", select the `gh-pages` branch as the source
   - Your site will be published at `https://crohnos.github.io/portfolio-blog/`

If you want to use a custom domain:
1. Add your domain to the CNAME file
2. Configure your DNS provider with GitHub Pages
3. Enable HTTPS in your repository settings

## Development Workflow

1. Run locally: `npm run dev`
2. Add or edit posts in the `/posts` directory
3. Generate static site: `npm run build`
4. Deploy to GitHub Pages: `npm run deploy`