/**
 * @file Helpdesk type definitions for YouTrack API
 * @description Represents helpdesk entities in YouTrack
 */

import type { BaseEntity, YTSet } from './core';

/**
 * Represents a channel used by customers to reach out to the helpdesk for support.
 * @extends BaseEntity
 * @since 2019.1
 */
export class Channel extends BaseEntity {
  /** The name assigned to a channel in a helpdesk project */
  readonly name: string;
}

/**
 * Represents an online form used in a helpdesk project.
 * Online forms provide customers with a web-based interface for submitting inquiries.
 * @extends Channel
 * @since 2019.1
 */
export class FeedbackForm extends Channel {
  /**
   * Searches for FeedbackForm entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
   * @returns The set of FeedbackForm entities that contain the specified extension properties.
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<FeedbackForm>;
}

/**
 * Represents an email channel used in a helpdesk project.
 * Email channels pull messages from an external mail service and process them according to the channel settings.
 * @extends Channel
 * @since 2019.1
 */
export class MailboxChannel extends Channel {
  /**
   * Searches for MailboxChannel entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
   * @returns The set of MailboxChannel entities that contain the specified extension properties.
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<MailboxChannel>;
}

/**
 * Represents a group of business hours settings in a helpdesk project.
 * @extends BaseEntity
 * @since 2019.1
 */
export class Calendar extends BaseEntity {
  // Calendar has no additional properties beyond what's inherited from BaseEntity
}

/**
 * Represents a group of 24x7 business hours settings in a helpdesk project.
 * @extends Calendar
 * @since 2019.1
 */
export class Calendar24x7 extends Calendar {
  /**
   * Searches for Calendar24x7 entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
   * @returns The set of Calendar24x7 entities that contain the specified extension properties.
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<Calendar24x7>;
  
  /**
   * Returns an instance of a Calendar24x7 entity.
   * @returns An instance of Calendar24x7.
   */
  static instance(): Calendar24x7;
}

/**
 * Represents a group of simple business hours settings in a helpdesk project.
 * @extends Calendar
 * @since 2019.1
 */
export class SimpleCalendar extends Calendar {
  /**
   * Searches for SimpleCalendar entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
   * @returns The set of SimpleCalendar entities that contain the specified extension properties.
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<SimpleCalendar>;
}

/**
 * Represents an SLA policy that defines the time goals for ticket responses and resolution.
 * @extends BaseEntity
 * @since 2023.1
 */
export class SLA extends BaseEntity {
  /**
   * The name of the SLA policy.
   */
  readonly name: string;
  
  /**
   * Searches for SLA entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
   * @returns The set of SLA entities that contain the specified extension properties.
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<SLA>;
}

/**
 * Represents the status of an SLA policy applied to a ticket.
 * @extends BaseEntity
 * @since 2023.1
 */
export class SLAStatus extends BaseEntity {
  /**
   * The SLA policy associated with this status.
   */
  readonly sla: SLA;
  
  /**
   * The set of paused intervals for this SLA.
   */
  readonly pausedIntervals: YTSet<XdSlaPausedInterval>;
}

/**
 * Represents an SLA paused interval with start and stop times.
 * @extends BaseEntity
 * @since 2023.1
 */
export class XdSlaPausedInterval extends BaseEntity {
  /**
   * The beginning of SLA pause interval.
   */
  readonly start: number;
  
  /**
   * The end of SLA pause interval.
   */
  readonly stop: number;
}
