import React from 'react';
import type { CollectionEntry } from 'astro:content';

interface FeaturedPostCardProps {
  post: CollectionEntry<'blog'>;
  baseUrl: string;
  readingTime: string;
  excerpt: string;
}

export default function FeaturedPostCard({ post, baseUrl, readingTime, excerpt }: FeaturedPostCardProps) {
  const { slug } = post;
  const { title, date, author, categories = [] } = post.data;

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Limit categories to display
  const visibleCategories = categories.slice(0, 3);

  return (
    <article className="featured-post">
      <div className="featured-post-content">
        <div className="featured-post-header">
          <div className="featured-badge">Featured</div>
          {visibleCategories.length > 0 && (
            <div className="post-card-categories">
              {visibleCategories.map((category) => (
                <a 
                  key={category} 
                  href={`${baseUrl}/categories/${category.toLowerCase().replace(/ /g, '-')}`} 
                  className="category-badge"
                >
                  {category}
                </a>
              ))}
            </div>
          )}
        </div>
        
        <h2>
          <a href={`${baseUrl}/blog/${slug}`}>{title}</a>
        </h2>
        
        <div className="post-card-meta">
          <span className="post-author">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {author}
          </span>
          
          <span className="post-date">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {formattedDate}
          </span>
          
          <span className="post-reading-time">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {readingTime}
          </span>
        </div>
        
        <div className="post-excerpt">
          <p>{excerpt}</p>
        </div>
        
        <a href={`${baseUrl}/blog/${slug}`} className="read-more">
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </article>
  );
}