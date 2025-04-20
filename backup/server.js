const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');
const marked = require('marked');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    console.log('Fetching all posts...');
    const postsDir = path.join(__dirname, 'posts');
    console.log('Posts directory:', postsDir);
    
    const files = await fs.readdir(postsDir);
    console.log('Files found:', files);
    
    const posts = await Promise.all(
      files.map(async (file) => {
        try {
          const filePath = path.join(postsDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          console.log(`Processing ${file}, content length: ${content.length}`);
          
          const parsed = matter(content);
          console.log(`Parsed frontmatter for ${file}:`, parsed.data);
          
          return {
            slug: file.replace('.md', ''),
            title: parsed.data.title,
            date: parsed.data.date,
          };
        } catch (err) {
          console.error(`Error processing file ${file}:`, err);
          return null;
        }
      })
    );
    
    const filteredPosts = posts.filter(post => post !== null);
    console.log('Sending posts:', filteredPosts);
    
    res.json(filteredPosts);
  } catch (error) {
    console.error('Error in /api/posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get a single post
app.get('/api/posts/:slug', async (req, res) => {
  const { slug } = req.params;
  console.log(`Fetching post with slug: ${slug}`);
  
  const filePath = path.join(__dirname, 'posts', `${slug}.md`);
  console.log(`Looking for file: ${filePath}`);
  
  try {
    const content = await fs.readFile(filePath, 'utf8');
    console.log(`Post content length: ${content.length}`);
    
    try {
      const parsed = matter(content);
      console.log('Parsed frontmatter:', parsed.data);
      console.log('Content excerpt:', parsed.content.substring(0, 50) + '...');
      
      const htmlContent = marked.parse(parsed.content);
      console.log('HTML excerpt:', htmlContent.substring(0, 50) + '...');
      
      const response = {
        slug,
        title: parsed.data.title,
        date: parsed.data.date,
        content: htmlContent,
      };
      
      console.log('Sending response:', { ...response, content: '[HTML content]' });
      res.json(response);
      
    } catch (parseError) {
      console.error('Error parsing markdown:', parseError);
      res.status(500).json({ error: 'Failed to parse post content' });
    }
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    res.status(404).json({ error: 'Post not found' });
  }
});

// Catch-all route to return the main index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
  .on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Error: Port ${PORT} is already in use. Please choose a different port.`);
    } else {
      console.error('Server error:', error);
    }
    process.exit(1);
  });