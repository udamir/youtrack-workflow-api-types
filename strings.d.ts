/**
 * Type definitions for @jetbrains/youtrack-scripting-api/strings
 * Based on documentation: https://www.jetbrains.com/help/youtrack/devportal/YouTrack-Api-Documentation.html
 */

/**
 * Returns the Levenshtein distance between two strings.
 * Delegates to org.apache.commons.text.similarity.LevenshteinDistance.
 * @param str1 The first string.
 * @param str2 The string that is compared to the first string.
 */
export function getLevenshteinDistance(str1: string, str2: string): number;

/**
 * Calculates the MD5 digest of a string and returns the value as a 32 character hex string.
 * @param str String to digest.
 * @returns Digested hex string.
 * @since 2022.1
 */
export function md5(str: string): string;
