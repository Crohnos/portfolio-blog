import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      Loading posts...
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h2>Error Loading Posts</h2>
      <p>{error}</p>
    </div>
  );

  // Separate featured and regular posts
  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <div className="home-page">
      <div className="home-intro">
        <h1>Welcome to My Portfolio Blog</h1>
        <p>
          Exploring the intersection of technology, creativity, and personal growth.
          Here you'll find my thoughts on web development, programming, and more.
        </p>
      </div>
      
      <h2>Recent Posts... in the form of Harry Potter Fan Fiction</h2>
      
      {posts.length === 0 ? (
        <div className="no-posts-message">
          <p>No posts found. Check back soon for new content!</p>
        </div>
      ) : (
        <>
          {/* Featured Posts Section */}
          {featuredPosts.length > 0 && (
            <section className="featured-posts-section">
              <h2>Featured Posts</h2>
              <div className="featured-posts">
                {featuredPosts.map(post => (
                  <article key={post.slug} className="featured-post">
                    <div className="featured-post-content">
                      <div className="featured-post-header">
                        <div className="featured-badge">Featured</div>
                        {post.categories && post.categories.length > 0 && (
                          <div className="post-card-categories">
                            {post.categories.slice(0, 3).map((category, index) => (
                              <span key={index} className="category-badge">{category}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <h2><a href={`/post/${post.slug}`}>{post.title}</a></h2>
                      <div className="post-card-meta">
                        <div className="post-author">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <span>{post.author}</span>
                        </div>
                        <div className="post-date">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          <span>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="post-reading-time">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>{post.readingTime || 5} min read</span>
                        </div>
                      </div>
                      <p className="post-excerpt">
                        {post.excerpt || post.content.substring(0, 150) + '...'}
                      </p>
                      <a href={`/post/${post.slug}`} className="read-more">
                        Read more
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Regular Posts Section */}
          {regularPosts.length > 0 && (
            <section className="regular-posts-section">
              <h2>More Posts</h2>
              <div className="posts-grid">
                {regularPosts.map(post => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default Home;