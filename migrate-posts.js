const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Source and destination directories
const sourceDir = '/home/crohnos/portfolio-blog/posts';
const destDir = '/home/crohnos/portfolio-blog/astro-paper-portfolio/src/data/blog';

// Create categories directory structure
const categories = ['personal', 'tutorials', 'articles'];
categories.forEach(category => {
  const dir = path.join(destDir, category);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Posts that have already been migrated
const migratedPosts = [
  'comparison-go-rust-web-game-dev.md',
  'doordash-addiction-epidemic.md',
  'the-tools-i-use-for-web-dev.md',
  'building-ai-author-interactive-story-generator.md',
  'building-cac-inventory-management-system.md',
  'creating-an-internal-merch-store.md',
  'developing-the-joshua-center-job-app-tracker.md'
];

// Map to categorize posts
const postCategories = {
  'being-a-band-nerd-taught-me-to-learn.md': 'personal',
  'best-activities-for-touching-grass.md': 'personal',
  'game-dev-as-creative-intersection.md': 'articles',
  'learning-react.md': 'tutorials',
  'my-first-post.md': 'personal',
  'programming-health-lifestyle-effects.md': 'personal',
  'the-best-resources-for-learning-javascript.md': 'tutorials',
  'the-immorality-of-microtransactions.md': 'articles',
  'why-i-quit-it-audit.md': 'personal',
  'why-i-stopped-playing-trumpet.md': 'personal'
};

// Map categories to tags
const categoryToTags = {
  'personal': ['Personal', 'Lifestyle'],
  'tutorials': ['Web Development', 'Programming', 'Tutorials'],
  'articles': ['Technology', 'Society']
};

// Helper function to get tags based on filename and category
function getTags(filename, category) {
  const baseTags = categoryToTags[category] || [];
  
  // Add specific tags based on filename keywords
  if (filename.includes('react')) baseTags.push('React');
  if (filename.includes('javascript')) baseTags.push('JavaScript');
  if (filename.includes('game')) baseTags.push('Game Development');
  if (filename.includes('health')) baseTags.push('Health');
  if (filename.includes('music') || filename.includes('trumpet') || filename.includes('band')) baseTags.push('Music');
  if (filename.includes('learning')) baseTags.push('Learning');
  if (filename.includes('audit')) baseTags.push('Career');
  
  return [...new Set(baseTags)]; // Remove duplicates
}

// Process each post
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error('Error reading source directory:', err);
    return;
  }

  files.forEach(file => {
    // Skip already migrated posts
    if (migratedPosts.includes(file)) {
      console.log(`Skipping already migrated post: ${file}`);
      return;
    }

    const sourceFile = path.join(sourceDir, file);
    if (fs.statSync(sourceFile).isFile() && file.endsWith('.md')) {
      try {
        // Read the source file
        const fileContent = fs.readFileSync(sourceFile, 'utf8');
        const parsedContent = matter(fileContent);
        
        // Get the category for this post
        const category = postCategories[file] || 'articles';
        
        // Generate slug from filename
        const slug = file.replace('.md', '');
        
        // Convert date format
        let pubDate = new Date();
        if (parsedContent.data.date) {
          // Try to parse the date
          try {
            pubDate = new Date(parsedContent.data.date);
          } catch (e) {
            console.warn(`Could not parse date for ${file}, using current date`);
          }
        }
        
        // Format date as ISO string
        const pubDatetime = pubDate.toISOString();
        
        // Get tags
        const tags = getTags(file, category);
        
        // Create new frontmatter
        const newFrontmatter = {
          author: parsedContent.data.author || "John Graham",
          pubDatetime,
          title: parsedContent.data.title || "Untitled",
          slug,
          featured: false,
          draft: false,
          tags,
          description: parsedContent.content.split('\\n')[0].substring(0, 150) + '...'
        };
        
        // Create the new content with updated frontmatter
        const newContent = matter.stringify(parsedContent.content, newFrontmatter);
        
        // Write to the destination file
        const destFile = path.join(destDir, category, file);
        fs.writeFileSync(destFile, newContent, 'utf8');
        
        console.log(`Migrated: ${file} -> ${category}/${file}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  });
});

console.log('Migration completed!');