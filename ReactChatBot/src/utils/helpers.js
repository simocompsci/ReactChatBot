/**
 * Helper functions for the chatbot application
 */

/**
 * Truncate a string to a specified length and add ellipsis
 * @param {string} str - The string to truncate
 * @param {number} length - Maximum length before truncation
 * @returns {string} - Truncated string
 */
export function truncateString(str, length = 30) {
  if (!str || str.length <= length) return str;
  return str.substring(0, length) + '...';
}

/**
 * Format a date to a readable string
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export function formatDate(date) {
  if (!date) return '';
  
  const d = new Date(date);
  const now = new Date();
  
  // If date is today, show time
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // If date is this year, show month and day
  if (d.getFullYear() === now.getFullYear()) {
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
  
  // Otherwise show full date
  return d.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
}

/**
 * Generate a unique ID
 * @returns {string} - Unique ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Extract a title from a message
 * @param {string} message - Message content
 * @returns {string} - Extracted title
 */
export function extractTitleFromMessage(message) {
  if (!message) return 'New Chat';
  
  // Get first line or first 30 chars
  const firstLine = message.split('\n')[0];
  return truncateString(firstLine, 30);
}