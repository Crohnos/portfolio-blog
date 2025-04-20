/**
 * Format a date in a human-readable format
 * @param date - The date to format
 * @returns Formatted date string (e.g., 'January 1, 2023')
 */
export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format a date in a short format
 * @param date - The date to format
 * @returns Short formatted date string (e.g., 'Jan 1, 2023')
 */
export function formatShortDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}