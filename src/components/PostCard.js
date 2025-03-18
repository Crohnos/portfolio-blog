import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <article className="post-card">
      <h2><Link to={`/post/${post.slug}`}>{post.title}</Link></h2>
      <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
    </article>
  );
}

export default PostCard;