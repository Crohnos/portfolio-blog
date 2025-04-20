/**
 * Static Site Generator for Portfolio Blog
 */
const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');
const marked = require('marked');

// Configure marked to handle mermaid blocks
const renderer = new marked.Renderer();
const originalCodeRenderer = renderer.code.bind(renderer);
renderer.code = function(code, language) {
  if (language === 'mermaid') {
    return `<div class="mermaid">${code}</div>`;
  }
  return originalCodeRenderer(code, language);
};

marked.use({
  renderer,
  gfm: true,
  breaks: true
});

// Output directory for the static site
const outputDir = path.join(__dirname, 'dist');

// Source directories
const postsDir = path.join(__dirname, 'posts');
const publicDir = path.join(__dirname, 'public');

// Base URL for GitHub Pages (empty for local, /portfolio-blog for GitHub Pages)
const baseUrl = process.env.NODE_ENV === 'production' ? '/portfolio-blog' : '';

// Function to create the HTML template with proper baseUrl
function createPageTemplate(baseUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Blog</title>
  <meta name="description" content="A personal portfolio and blog site">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
  <link rel="stylesheet" href="${baseUrl}/css/style.css">
</head>
<body>
  <div class="container">
    <header>
      <h1><a href="${baseUrl}/" id="site-title">Portfolio Blog</a></h1>
      <nav>
        <ul>
          <li><a href="${baseUrl}/">Home</a></li>
        </ul>
      </nav>
    </header>
    
    <main id="app">
      {{content}}
    </main>
    
    <footer>
      <p>&copy; ${new Date().getFullYear()} Portfolio Blog</p>
    </footer>
  </div>
  <script>
    // Simple navigation without page reloads
    document.addEventListener('click', function(e) {
      if (e.target.tagName === 'A' && !e.target.getAttribute('target')) {
        const href = e.target.getAttribute('href');
        if (href.startsWith('/') && !href.startsWith('//')) {
          e.preventDefault();
          window.location.href = href;
        }
      }
    });
  </script>
</body>
</html>`;
}

// Create the HTML template with proper baseUrl
function createPageTemplate(baseUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Blog</title>
  <meta name="description" content="A personal portfolio and blog site">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
  <link rel="stylesheet" href="${baseUrl}/css/style.css">
  
  <!-- Code highlighting -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
  
  <!-- Mermaid.js for diagrams -->
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Initialize mermaid with custom theme for white text
      mermaid.initialize({
        startOnLoad: true,
        theme: 'dark',
        themeVariables: {
          nodeBorder: '#4d80e4',
          mainBkg: '#1e3a5f',
          nodeTextColor: '#ffffff',
          textColor: '#ffffff',
          labelTextColor: '#ffffff',
          clusterBkg: '#1e293b',
          clusterBorder: '#2d3748',
          edgeLabelBackground: '#1e293b',
          lineColor: '#4d80e4'
        },
        flowchart: { 
          useMaxWidth: true,
          htmlLabels: true
        }
      });
      
      // Initialize syntax highlighting
      if (typeof hljs !== 'undefined') {
        document.querySelectorAll('pre code:not(.language-mermaid)').forEach((block) => {
          hljs.highlightBlock(block);
        });
      }
    });
  </script>
</head>
<body>
  <div class="container">
    <header>
      <h1><a href="${baseUrl}/" id="site-title">Portfolio Blog</a></h1>
      <nav>
        <ul>
          <li><a href="${baseUrl}/">Home</a></li>
        </ul>
      </nav>
    </header>
    
    <main id="app">
      {{content}}
    </main>
    
    <footer>
      <p>&copy; ${new Date().getFullYear()} Portfolio Blog</p>
    </footer>
  </div>
  <script>
    // Simple navigation without page reloads
    document.addEventListener('click', function(e) {
      if (e.target.tagName === 'A' && !e.target.getAttribute('target')) {
        const href = e.target.getAttribute('href');
        if (href.startsWith('/') && !href.startsWith('//')) {
          e.preventDefault();
          window.location.href = href;
        }
      }
    });
  </script>
</body>
</html>`;
}

// Create the page template with the appropriate baseUrl
const pageTemplate = createPageTemplate(baseUrl);

// Create a directory if it doesn't exist
async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

// Copy a directory and its contents
async function copyDir(src, dest) {
  await ensureDir(dest);
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

// Generate a static HTML page
async function generateHtmlPage(content, outputPath, title = 'Portfolio Blog') {
  let html = pageTemplate.replace('{{content}}', content);
  html = html.replace('<title>Portfolio Blog</title>', `<title>${title}</title>`);
  await fs.writeFile(outputPath, html);
}

// Generate home page with post list
async function generateHomePage(posts) {
  // Separate featured and regular posts
  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);
  
  // Create featured post section if we have any
  let featuredSection = '';
  if (featuredPosts.length > 0) {
    featuredSection = `
      <section class="featured-posts-section">
        <h2>Featured Posts</h2>
        <div class="featured-posts">
          ${featuredPosts.map(post => {
            const visibleCategories = post.categories.slice(0, 3);
            const categoryBadges = visibleCategories.map(
              category => `<span class="category-badge">${category}</span>`
            ).join('');
            
            return `
              <article class="featured-post">
                <div class="featured-post-content">
                  <div class="featured-post-header">
                    <div class="featured-badge">Featured</div>
                    ${categoryBadges ? `<div class="post-card-categories">${categoryBadges}</div>` : ''}
                  </div>
                  <h2><a href="${baseUrl}/post/${post.slug}.html">${post.title}</a></h2>
                  <div class="post-card-meta">
                    <span class="post-author">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      ${post.author}
                    </span>
                    <span class="post-date">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      ${new Date(post.date).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}
                    </span>
                    <span class="post-reading-time">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      ${post.readingTime} min read
                    </span>
                  </div>
                  <div class="post-excerpt">
                    <p>${post.excerpt}</p>
                  </div>
                  <a href="${baseUrl}/post/${post.slug}.html" class="read-more">Read more →</a>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }
  
  // Create regular posts section
  let content = `
    <h1>Recent Posts... in the form of Harry Potter Fan Fiction</h1>
    ${posts.length === 0 ? '<p>No posts found</p>' : ''}
    
    ${featuredSection}
    
    <section class="regular-posts-section">
      ${regularPosts.length > 0 ? '<h2>More Posts</h2>' : ''}
      <div class="posts-grid">
        ${regularPosts.map(post => {
          // Generate category badges (limit to 2 on homepage)
          const visibleCategories = post.categories.slice(0, 2);
          const categoryBadges = visibleCategories.map(
            category => `<span class="category-badge">${category}</span>`
          ).join('');
          
          return `
            <article class="post-card">
              <h2><a href="${baseUrl}/post/${post.slug}.html">${post.title}</a></h2>
              <div class="post-card-meta">
                <span class="post-author">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  ${post.author}
                </span>
                <span class="post-date">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  ${new Date(post.date).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}
                </span>
                <span class="post-reading-time">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  ${post.readingTime} min read
                </span>
              </div>
              ${categoryBadges ? `<div class="post-card-categories">${categoryBadges}</div>` : ''}
              <div class="post-excerpt">
                <p>${post.excerpt}</p>
              </div>
              <a href="${baseUrl}/post/${post.slug}.html" class="read-more">Read more →</a>
            </article>
          `;
        }).join('')}
      </div>
    </section>
  `;
  
  await generateHtmlPage(content, path.join(outputDir, 'index.html'));
}

// Generate individual post pages
async function generatePostPages(posts) {
  for (const post of posts) {
    // Generate category badges
    const categoryBadges = post.categories.map(
      category => `<span class="category-badge">${category}</span>`
    ).join('');
    
    let content = `
      <article class="blog-post">
        <header class="post-header">
          <h1 class="post-title">${post.title}</h1>
          <div class="post-meta">
            <div class="post-author">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>${post.author}</span>
            </div>
            <div class="post-date">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div class="post-reading-time">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>${post.readingTime} min read</span>
            </div>
          </div>
          <div class="post-categories">
            ${categoryBadges}
          </div>
        </header>
        <div class="post-content">${post.content}</div>
        <script>
          // Re-run mermaid on post load with custom theme settings
          if (typeof mermaid !== 'undefined') {
            document.addEventListener('DOMContentLoaded', function() {
              // Make sure chart text is white on dark background
              mermaid.initialize({
                theme: 'dark',
                themeVariables: {
                  nodeBorder: '#4d80e4',
                  mainBkg: '#1e3a5f',
                  nodeTextColor: '#ffffff',
                  textColor: '#ffffff',
                  labelTextColor: '#ffffff',
                  clusterBkg: '#1e293b',
                  clusterBorder: '#2d3748',
                  edgeLabelBackground: '#1e293b',
                  lineColor: '#4d80e4'
                },
                flowchart: { 
                  useMaxWidth: true,
                  htmlLabels: true
                }
              });
              mermaid.init(undefined, '.mermaid');
            });
          }
        </script>
        <a href="${baseUrl}/" class="back-link">← Back to Home</a>
      </article>
    `;
    
    const postDir = path.join(outputDir, 'post');
    await ensureDir(postDir);
    await generateHtmlPage(content, path.join(postDir, `${post.slug}.html`), post.title);
  }
}

// Generate a 404 page
async function generate404Page() {
  let content = `
    <div class="error-page">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <a href="${baseUrl}/" class="back-link">← Back to Home</a>
    </div>
  `;
  
  await generateHtmlPage(content, path.join(outputDir, '404.html'));
}

// Function to create a short excerpt from HTML content
function createExcerpt(htmlContent, maxLength = 150) {
  // Remove HTML tags
  const textContent = htmlContent.replace(/<[^>]*>/g, '');
  
  // Trim and limit to maxLength
  let excerpt = textContent.trim().substring(0, maxLength);
  
  // If we cut in the middle of the text, add ellipsis
  if (textContent.length > maxLength) {
    excerpt += '...';
  }
  
  return excerpt;
}

// Function to calculate reading time
function calculateReadingTime(htmlContent) {
  // Remove HTML tags
  const textContent = htmlContent.replace(/<[^>]*>/g, '');
  
  // Count words (split by spaces and filter empty strings)
  const words = textContent.split(/\s+/).filter(Boolean);
  
  // Average reading speed: 200 words per minute
  const readingTimeMinutes = Math.ceil(words.length / 200);
  
  return readingTimeMinutes;
}

// Function to remove the first H1 heading from HTML content
function removeFirstH1(htmlContent) {
  // This removes the first <h1>...</h1> tag and its content
  return htmlContent.replace(/<h1[^>]*>.*?<\/h1>/, '');
}

// Main function to generate the static site
async function generateStaticSite() {
  try {
    console.log('Generating static site...');
    
    // Clear existing output directory
    await fs.rm(outputDir, { recursive: true, force: true });
    await ensureDir(outputDir);
    
    // Copy static assets from public directory
    console.log('Copying static assets...');
    await copyDir(publicDir, outputDir);
    
    // Read and process all markdown posts
    console.log('Processing blog posts...');
    const files = await fs.readdir(postsDir);
    
    const posts = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(postsDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        const { data, content: markdown } = matter(content);
        const fullHtmlContent = marked.parse(markdown);
        const htmlContent = removeFirstH1(fullHtmlContent);
        const readingTime = calculateReadingTime(fullHtmlContent);
        
        return {
          slug: file.replace('.md', ''),
          title: data.title,
          date: data.date,
          author: data.author || 'Anonymous',
          categories: data.categories || [],
          featured: data.featured || false,
          readingTime,
          content: htmlContent,
          excerpt: createExcerpt(fullHtmlContent)
        };
      })
    );
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Generate home page
    console.log('Generating home page...');
    await generateHomePage(posts);
    
    // Generate post pages
    console.log('Generating post pages...');
    await generatePostPages(posts);
    
    // Generate 404 page
    console.log('Generating 404 page...');
    await generate404Page();
    
    console.log('Static site generated successfully!');
    console.log(`Output directory: ${outputDir}`);
  } catch (error) {
    console.error('Error generating static site:', error);
    process.exit(1);
  }
}

// Run the generator
generateStaticSite();