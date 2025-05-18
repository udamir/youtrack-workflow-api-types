/**
 * Type definitions for @jetbrains/youtrack-scripting-api/date-time
 * Based on documentation: https://www.jetbrains.com/help/youtrack/devportal/YouTrack-Api-Documentation.html
 */

/**
 * This module contains functions that let you work with dates and times.
 */

/**
 * Represents a time period in the ISO-8601 format.
 * Maps to org.joda.time.Period
 */
export interface Period {
  /**
   * Gets the number of years in this period.
   */
  getYears(): number;
  
  /**
   * Gets the number of months in this period.
   */
  getMonths(): number;
  
  /**
   * Gets the number of weeks in this period.
   */
  getWeeks(): number;
  
  /**
   * Gets the number of days in this period.
   */
  getDays(): number;
  
  /**
   * Gets the number of hours in this period.
   */
  getHours(): number;
  
  /**
   * Gets the number of minutes in this period.
   */
  getMinutes(): number;
  
  /**
   * Gets the number of seconds in this period.
   */
  getSeconds(): number;
  
  /**
   * Gets the number of milliseconds in this period.
   */
  getMillis(): number;
  
  /**
   * Creates a new period with the specified number of years added.
   * @param years The amount of years to add
   */
  plusYears(years: number): Period;
  
  /**
   * Creates a new period with the specified number of months added.
   * @param months The amount of months to add
   */
  plusMonths(months: number): Period;
  
  /**
   * Creates a new period with the specified number of weeks added.
   * @param weeks The amount of weeks to add
   */
  plusWeeks(weeks: number): Period;
  
  /**
   * Creates a new period with the specified number of days added.
   * @param days The amount of days to add
   */
  plusDays(days: number): Period;
  
  /**
   * Creates a new period with the specified number of hours added.
   * @param hours The amount of hours to add
   */
  plusHours(hours: number): Period;
  
  /**
   * Creates a new period with the specified number of minutes added.
   * @param minutes The amount of minutes to add
   */
  plusMinutes(minutes: number): Period;
  
  /**
   * Converts this period to its total length in milliseconds.
   * @return The total length of the period in milliseconds
   */
  toStandardDuration(): number;
  
  /**
   * Returns a string representation of this period.
   */
  toString(): string;
}

/**
 * Represents a Joda Time DateTime - an immutable datetime class representing a datetime without a time zone.
 * Maps to org.joda.time.DateTime
 */
export interface DateTime {
  /**
   * Gets the year of era field value.
   */
  getYear(): number;
  
  /**
   * Gets the month of year field value.
   */
  getMonthOfYear(): number;
  
  /**
   * Gets the day of month field value.
   */
  getDayOfMonth(): number;
  
  /**
   * Gets the day of week field value.
   */
  getDayOfWeek(): number;
  
  /**
   * Gets the hour of day field value.
   */
  getHourOfDay(): number;
  
  /**
   * Gets the minute of hour field value.
   */
  getMinuteOfHour(): number;
  
  /**
   * Gets the second of minute field value.
   */
  getSecondOfMinute(): number;
  
  /**
   * Gets the millis of second field value.
   */
  getMillisOfSecond(): number;
  
  /**
   * Gets the milliseconds of the datetime instant from the Java epoch of 1970-01-01T00:00:00Z.
   */
  getMillis(): number;
  
  /**
   * Returns a copy of this datetime plus the specified period.
   * @param period The period to add
   */
  plus(period: Period): DateTime;
  
  /**
   * Returns a copy of this datetime minus the specified period.
   * @param period The period to subtract
   */
  minus(period: Period): DateTime;
  
  /**
   * Returns a copy of this datetime with the specified year.
   * @param year The year to set
   */
  withYear(year: number): DateTime;
  
  /**
   * Returns a copy of this datetime with the specified month of year.
   * @param monthOfYear The month of year to set (1-12)
   */
  withMonthOfYear(monthOfYear: number): DateTime;
  
  /**
   * Returns a copy of this datetime with the specified day of month.
   * @param dayOfMonth The day of month to set (1-31)
   */
  withDayOfMonth(dayOfMonth: number): DateTime;
  
  /**
   * Compares this object with the specified object for equality.
   * @param other The object to compare with
   */
  equals(other: DateTime): boolean;
  
  /**
   * Is this datetime before the instant passed in.
   * @param other The datetime to compare to
   */
  isBefore(other: DateTime): boolean;
  
  /**
   * Is this datetime after the instant passed in.
   * @param other The datetime to compare to
   */
  isAfter(other: DateTime): boolean;
  
  /**
   * Converts this object to a java.util.Date.
   */
  toDate(): Date;
  
  /**
   * Returns a string representation of this datetime.
   */
  toString(): string;
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
