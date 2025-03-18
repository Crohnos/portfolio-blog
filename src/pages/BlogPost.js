import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>Error: {error} <Link to="/">Back to Home</Link></div>;
  if (!post) return <div>Post not found <Link to="/">Back to Home</Link></div>;

  return (
    <article className="blog-post">
      <h1>{post.title}</h1>
      <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
      <div 
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="post-navigation">
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    </article>
  );
}

export default BlogPost;