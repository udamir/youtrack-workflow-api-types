/**
 * Type definitions for @jetbrains/youtrack-scripting-api/date-time
 * Based on documentation: https://www.jetbrains.com/help/youtrack/devportal/YouTrack-Api-Documentation.html
 */

/**
 * This module contains functions that let you work with dates and times.
 */

/**
 * Represents a time period.
 */
export interface Period {
  [key: string]: unknown;
}

/**
 * Returns a timestamp that represents a point in time after the specified period from the specified date.
 * @param timestamp The base date value.
 * @param duration A duration as a number (in milliseconds), string representation, or period as retrieved from a custom field
 *                or returned by the toPeriod() function. The string representation is a series of numeric values followed by 
 *                the abbreviation that represents the timespan, in descending order. For example, 3w4d23h58m.
 * @returns The resulting timestamp.
 * @since 2018.2.42881
 */
export function after(timestamp: number | object | string, duration: number | string | Period): number;

/**
 * Returns a timestamp that represents a point in time before the specified period from the specified date.
 * @param timestamp The base date value.
 * @param duration A duration as a number (in milliseconds), string representation, or period as retrieved from a custom field
 *                or returned by the toPeriod() function. The string representation is a series of numeric values followed by 
 *                the abbreviation that represents the timespan, in descending order. For example, 3w4d23h58m.
 * @returns The resulting timestamp.
 * @since 2018.2.42881
 */
export function before(timestamp: number | object | string, duration: number | string | Period): number;

/**
 * Creates a string representation of a Unix timestamp.
 * @param timestamp The timestamp to format as a string.
 * @param format The date format to apply to the output. If no value is specified, the date format is supplied by the system.
 *              For actions that are attributed to the current user, the date format setting from the profile for the current user is applied.
 *              For actions that are attributed to the workflow user account, the global date fields format setting is applied.
 *              For format description, see https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/text/SimpleDateFormat.html.
 * @param timeZoneId The ID of a time zone. Applies an offset to the original timestamp, which is in UTC.
 *                   If no value is specified, the time zone is supplied by the system.
 *                   For actions that are attributed to the current user, the local time zone setting from the profile for the current user is applied.
 *                   For actions that are attributed to the workflow user account, the global default time zone is applied.
 * @returns A string representation of the specified timestamp.
 */
export function format(timestamp: number | object | string, format?: string, timeZoneId?: string): string;

/**
 * Parses a string representation of a date to return a Unix timestamp.
 * Use this method instead of the Date.parse() method from JavaScript.
 * @param dateTimeString The string representation of a date.
 * @param formats A date format that possibly matches the dateTimeString or an array of formats.
 *               If an array is provided, the formats are applied sequentially until the dateTimeString is parsed successfully.
 *               If no value is specified, the date format is supplied by the system.
 *               For format description, see https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/text/SimpleDateFormat.html.
 * @param timeZoneId The ID of a time zone in which the dateTimeString occurs.
 *                   This parameter is only effective when the format that matches the string does not provide any timestamp information.
 *                   If neither the format that successfully matches the string nor this parameter provide the time zone, the time zone is supplied by the system.
 * @returns A timestamp representation of the specified string.
 */
export function parse(dateTimeString: string, formats?: string | string[], timeZoneId?: string): number;

/**
 * Creates a period representation of an argument.
 * @param period A duration in milliseconds as either a number or a string.
 *              The string representation is a series of numeric values followed by the abbreviation that represents the timespan,
 *              in descending order. For example, 3w4d23h58m.
 * @returns The period representation of the specified argument.
 */
export function toPeriod(period: number | string): Period;
