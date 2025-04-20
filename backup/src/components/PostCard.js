import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  // Format date in a more readable way
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Calculate estimated reading time (rough estimate)
  const readingTime = post.content ? Math.ceil(post.content.split(' ').length / 200) : 3;
  
  // Get excerpt from content
  const getExcerpt = (content, maxLength = 120) => {
    if (!content) return '';
    // Strip HTML tags
    const plainText = content.replace(/<[^>]+>/g, '');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substr(0, plainText.lastIndexOf(' ', maxLength)) + '...';
  };

  return (
    <article className="post-card">
      <div className="post-card-content">
        {post.categories && post.categories.length > 0 && (
          <div className="post-card-categories">
            {post.categories.slice(0, 2).map((category, index) => (
              <span key={index} className="category-badge">{category}</span>
            ))}
            {post.categories.length > 2 && (
              <span className="category-badge">+{post.categories.length - 2}</span>
            )}
          </div>
        )}
        
        <h2><Link to={`/post/${post.slug}`}>{post.title}</Link></h2>
        
        <div className="post-card-meta">
          <div className="post-date">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {formattedDate}
          </div>
          
          <div className="post-reading-time">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {readingTime} min read
          </div>
        </div>
        
        {post.content && (
          <p className="post-excerpt">{getExcerpt(post.content)}</p>
        )}
        
        <Link to={`/post/${post.slug}`} className="read-more">
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default PostCard;