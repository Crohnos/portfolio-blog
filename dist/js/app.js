// DOM elements
const app = document.getElementById('app');
const currentYearSpan = document.getElementById('current-year');

// Set current year in footer
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

// Header scroll effect
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Initialize any code syntax highlighting if available
  if (typeof hljs !== 'undefined') {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }
  
  // Initialize mermaid diagrams if available
  if (typeof mermaid !== 'undefined') {
    mermaid.init(undefined, '.mermaid');
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

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
  app.innerHTML = '<div class="loading"></div>';
  
  try {
    const response = await fetch('/api/posts');
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const posts = await response.json();
    
    if (!posts || posts.length === 0) {
      app.innerHTML = `
        <div class="home-page">
          <div class="home-intro">
            <h1>Welcome to My Portfolio Blog</h1>
            <p>
              Exploring the intersection of technology, creativity, and personal growth.
              Here you'll find my thoughts on web development, programming, and more.
            </p>
          </div>
          
          <h2>Recent Posts... in the form of Harry Potter Fan Fiction</h2>
          
          <div class="no-posts-message">
            <p>No posts found. Check back soon for new content!</p>
          </div>
        </div>
      `;
      return;
    }
    
    app.innerHTML = `
      <div class="home-page">
        <div class="home-intro">
          <h1>Welcome to My Portfolio Blog</h1>
          <p>
            Exploring the intersection of technology, creativity, and personal growth.
            Here you'll find my thoughts on web development, programming, and more.
          </p>
        </div>
        
        <h2>Recent Posts... in the form of Harry Potter Fan Fiction</h2>
        
        <div class="posts-grid">
          ${posts.map(post => {
            // Format date in a more readable way
            const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            
            // Calculate estimated reading time
            const readingTime = post.content ? Math.ceil(post.content.split(' ').length / 200) : 3;
            
            // Get excerpt from content
            const getExcerpt = (content, maxLength = 120) => {
              if (!content) return '';
              // Strip HTML tags
              const plainText = content.replace(/<[^>]+>/g, '');
              if (plainText.length <= maxLength) return plainText;
              return plainText.substr(0, plainText.lastIndexOf(' ', maxLength)) + '...';
            };

            return `
              <article class="post-card">
                <div class="post-card-content">
                  ${post.categories && post.categories.length > 0 ? `
                    <div class="post-card-categories">
                      ${post.categories.slice(0, 2).map((category, index) => `
                        <span class="category-badge">${category}</span>
                      `).join('')}
                      ${post.categories.length > 2 ? `
                        <span class="category-badge">+${post.categories.length - 2}</span>
                      ` : ''}
                    </div>
                  ` : ''}
                  
                  <h2><a href="/post/${post.slug}">${post.title}</a></h2>
                  
                  <div class="post-card-meta">
                    <div class="post-date">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      ${formattedDate}
                    </div>
                    
                    <div class="post-reading-time">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      ${readingTime} min read
                    </div>
                  </div>
                  
                  ${post.content ? `
                    <p class="post-excerpt">${getExcerpt(post.content)}</p>
                  ` : ''}
                  
                  <a href="/post/${post.slug}" class="read-more">
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error fetching posts:', error);
    app.innerHTML = `
      <div class="error-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h2>Error Loading Posts</h2>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// Post page - show a single post
async function postPage(slug) {
  app.innerHTML = '<div class="loading"></div>';
  
  try {
    const response = await fetch(`/api/posts/${slug}`);
    
    if (!response.ok) {
      throw new Error('Post not found');
    }
    
    const post = await response.json();
    
    // Format date in a more readable way
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Calculate estimated reading time (rough estimate)
    const readingTime = Math.ceil(post.content.split(' ').length / 200);
    
    app.innerHTML = `
      <article class="blog-post">
        <header class="post-header">
          <div class="post-categories">
            ${post.categories && post.categories.map((category, index) => `
              <span key="${index}" class="category-badge">${category}</span>
            `).join('')}
          </div>
          <h1 class="post-title">${post.title}</h1>
          <div class="post-meta">
            <div class="post-author">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>${post.author || 'Anonymous'}</span>
            </div>
            <div class="post-date">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>${formattedDate}</span>
            </div>
            <div class="post-reading-time">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>${readingTime} min read</span>
            </div>
          </div>
        </header>
        
        ${post.featuredImage ? `
          <div class="post-featured-image">
            <img src="${post.featuredImage}" alt="${post.title}" />
          </div>
        ` : ''}
        
        <div class="post-content">${post.content}</div>
        
        <script>
          // Re-initialize mermaid diagrams on post load
          if (typeof mermaid !== 'undefined') {
            setTimeout(() => mermaid.init(undefined, '.mermaid'), 100);
          }
        </script>
        
        <div class="post-navigation">
          <a href="/" class="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </a>
        </div>
      </article>
    `;
  } catch (error) {
    console.error('Error fetching post:', error);
    app.innerHTML = `
      <div class="error-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h2>Error Loading Post</h2>
        <p>${error.message}</p>
        <a href="/">Back to Home</a>
      </div>
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
    if (href && href.startsWith('/')) {
      e.preventDefault();
      window.history.pushState({}, '', href);
      router();
      
      // Scroll to top for new page navigation
      window.scrollTo(0, 0);
    }
  }
});

// Initial route
document.addEventListener('DOMContentLoaded', function() {
  router();
});