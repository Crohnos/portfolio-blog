/**
 * Calculate reading time for a post
 * @param content - The post content
 * @param wordsPerMinute - Words per minute (defaults to 200)
 * @returns Reading time in minutes (always at least 1)
 */
export function calculateReadingTime(content: string, wordsPerMinute = 200): number {
  // Count words
  const wordCount = content.trim().split(/\s+/).length;
  
  // Calculate reading time
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // Return at least 1 minute
  return Math.max(1, readingTime);
}

/**
 * Generate an excerpt from content
 * @param content - The content to create an excerpt from
 * @param maxLength - Maximum length for the excerpt
 * @returns Excerpt string
 */
export function generateExcerpt(content: string, maxLength = 150): string {
  // Remove Markdown formatting (very basic)
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // Remove links
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') // Remove bold/italic
    .replace(/`{1,3}[^`]+`{1,3}/g, '') // Remove code blocks
    .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '') // Remove images
    .trim();
  
  // Limit to maxLength chars
  let excerpt = plainText.substring(0, maxLength);
  
  // Add ellipsis if text was truncated
  if (plainText.length > maxLength) {
    excerpt += '...';
  }
  
  return excerpt;
}