/**
 * Generate a URL with the correct base path
 * @param path - The path (with or without leading slash)
 * @returns The path with the base prefix
 */
export function getBaseUrl(path: string): string {
  // Use explicit '/portfolio-blog' base path for GitHub Pages
  const BASE_PATH = '/portfolio-blog';
  
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  // For root path
  if (cleanPath === "") {
    return BASE_PATH;
  }
  
  // Join base URL with path, ensuring slash between them
  return `${BASE_PATH}/${cleanPath}`;
}