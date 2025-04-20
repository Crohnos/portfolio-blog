import { z, defineCollection } from 'astro:content';

// Define a schema for blog posts
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string().or(z.date()).transform((val) => new Date(val)),
    author: z.string().default('Anonymous'),
    image: z.string().optional(),
    categories: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Export collections to register them
export const collections = {
  'blog': blogCollection,
};