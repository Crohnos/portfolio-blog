import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { generateExcerpt } from '../utils/blogHelpers';

export async function GET(context) {
  const blog = await getCollection('blog', ({ data }) => {
    return !data.draft;
  });
  
  // Sort by date (newest first)
  const sortedPosts = blog.sort((a, b) => 
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
  
  return rss({
    title: 'Portfolio Blog',
    description: 'A personal portfolio and blog site featuring web development projects and technical articles.',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description || generateExcerpt(post.body, 200),
      link: `/blog/${post.slug}/`,
      categories: post.data.categories || [],
      author: post.data.author || 'Anonymous',
    })),
    customData: `<language>en-us</language>`,
  });
}