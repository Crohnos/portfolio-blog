// DOM elements
const app = document.getElementById('app');
const currentYearSpan = document.getElementById('current-year');

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Routes
const routes = {
  '/': homePage,
  '/post': postPage
};

// Navigate to the appropriate route
function router() {
  const path = window.location.pathname;
  
  if (path.startsWith('/post/')) {
    const slug = path.split('/post/')[1];
    routes['/post'](slug);
  } else {
    routes['/'](path);
  }
}

// Home page - list all posts
async function homePage() {
  app.innerHTML = '<div class="loading">Loading posts...</div>';
  
  try {
    console.log('Fetching posts...');
    const response = await fetch('/api/posts');
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const posts = await response.json();
    console.log('Posts data:', posts);
    
    if (!posts || posts.length === 0) {
      app.innerHTML = '<h1>Recent Posts</h1><p>No posts found</p>';
      return;
    }
    
    app.innerHTML = `
      <h1>Recent Posts</h1>
      <div class="posts-grid">
        ${posts.map(post => `
          <article class="post-card">
            <h2><a href="/post/${post.slug}">${post.title}</a></h2>
            <p class="post-date">${new Date(post.date).toLocaleDateString()}</p>
          </article>
        `).join('')}
      </div>
    `;
  } catch (error) {
    console.error('Error fetching posts:', error);
    app.innerHTML = `<div class="error">Error: ${error.message}</div>`;
  }
}

// Post page - show a single post
async function postPage(slug) {
  app.innerHTML = '<div class="loading">Loading post...</div>';
  console.log('Loading post with slug:', slug);
  
  try {
    const response = await fetch(`/api/posts/${slug}`);
    console.log('Post response status:', response.status);
    
    if (!response.ok) {
      throw new Error('Post not found');
    }
    
    const post = await response.json();
    console.log('Post data:', post);
    
    app.innerHTML = `
      <article class="blog-post">
        <h1>${post.title}</h1>
        <span class="post-date">${new Date(post.date).toLocaleDateString()}</span>
        <div class="post-content">${post.content}</div>
        <a href="/" class="back-link">← Back to Home</a>
      </article>
    `;
  } catch (error) {
    console.error('Error fetching post:', error);
    app.innerHTML = `
      <div class="error">Error: ${error.message}</div>
      <a href="/" class="back-link">← Back to Home</a>
    `;
  }
}

// Handle navigation
window.addEventListener('popstate', router);

// Intercept link clicks for SPA navigation
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && !e.target.getAttribute('target')) {
    const href = e.target.getAttribute('href');
    
    // Only handle internal links
    if (href.startsWith('/')) {
      e.preventDefault();
      window.history.pushState({}, '', href);
      router();
    }
  }
});

// Initial route
document.addEventListener('DOMContentLoaded', function() {
  router();
});