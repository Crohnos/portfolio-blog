/**
 * Static Site Generator for Portfolio Blog
 */
const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');
const marked = require('marked');

// Output directory for the static site
const outputDir = path.join(__dirname, 'dist');

// Source directories
const postsDir = path.join(__dirname, 'posts');
const publicDir = path.join(__dirname, 'public');

// Template for rendered HTML pages
const pageTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Blog</title>
  <meta name="description" content="A personal portfolio and blog site">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <div class="container">
    <header>
      <h1><a href="/" id="site-title">Portfolio Blog</a></h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
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
async function generateHtmlPage(content, outputPath) {
  const html = pageTemplate.replace('{{content}}', content);
  await fs.writeFile(outputPath, html);
}

// Generate home page with post list
async function generateHomePage(posts) {
  let content = `
    <h1>Recent Posts</h1>
    ${posts.length === 0 ? '<p>No posts found</p>' : ''}
    <div class="posts-grid">
      ${posts.map(post => `
        <article class="post-card">
          <h2><a href="/post/${post.slug}.html">${post.title}</a></h2>
          <p class="post-date">${new Date(post.date).toLocaleDateString()}</p>
        </article>
      `).join('')}
    </div>
  `;
  
  await generateHtmlPage(content, path.join(outputDir, 'index.html'));
}

// Generate individual post pages
async function generatePostPages(posts) {
  for (const post of posts) {
    let content = `
      <article class="blog-post">
        <h1>${post.title}</h1>
        <span class="post-date">${new Date(post.date).toLocaleDateString()}</span>
        <div class="post-content">${post.content}</div>
        <a href="/" class="back-link">← Back to Home</a>
      </article>
    `;
    
    const postDir = path.join(outputDir, 'post');
    await ensureDir(postDir);
    await generateHtmlPage(content, path.join(postDir, `${post.slug}.html`));
  }
}

// Generate a 404 page
async function generate404Page() {
  let content = `
    <div class="error-page">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <a href="/" class="back-link">← Back to Home</a>
    </div>
  `;
  
  await generateHtmlPage(content, path.join(outputDir, '404.html'));
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
        
        return {
          slug: file.replace('.md', ''),
          title: data.title,
          date: data.date,
          content: marked.parse(markdown)
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