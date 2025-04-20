# Portfolio Blog - Astro Redesign

A completely redesigned version of the Portfolio Blog built with Astro, focusing on content collections and performance.

## Key Features

### Content-Focused Design
- Content collections with typed schema validation
- Automatic reading time calculation
- Category-based organization with dedicated pages
- Rich Markdown support with code highlighting and Mermaid diagrams

### Modern Architecture
- Built with Astro 3.0+ for optimal performance
- React components for interactive elements
- TypeScript for type safety
- MDX support for enhanced content

### Performance Optimizations
- Static site generation for lightning-fast page loads
- Optimized image processing
- Minimal JavaScript sent to the client
- Full SEO support with meta tags

## Technical Implementation

### Content Collections
Blog posts are stored in `src/content/blog/` and are automatically validated against a defined schema:

```typescript
// src/content/config.ts
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string().or(z.date()).transform((val) => new Date(val)),
    author: z.string().default('Anonymous'),
    image: z.string().optional(),
    categories: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});
```

### Enhanced Features
- **Category Pages**: Automatically generated pages for each category
- **Reading Time**: Calculated based on word count for each post
- **RSS Feed**: Auto-generated RSS feed for subscribers
- **Responsive Design**: Fully responsive with PicoCSS foundation

## Improvements Over Original Design

1. **Content Management**: Structured content with validation instead of loose Markdown
2. **DX (Developer Experience)**: TypeScript throughout, component reuse
3. **Performance**: Minimal JS shipped to the client, optimized assets
4. **SEO**: Built-in meta tags, structured data, and sitemap
5. **Maintainability**: Organized component structure, clear separation of concerns

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build site
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Directory Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # React and Astro components
│   ├── content/         # Content collections (blog posts)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Page routes and endpoints
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
└── astro.config.mjs     # Astro configuration
```

## Future Enhancements

- Image optimization with Astro's built-in image processing
- Dark/light mode toggle
- Search functionality
- Comment system integration
- View transitions for smooth navigation