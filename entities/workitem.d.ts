/**
 * @file WorkItem type definitions for YouTrack API
 * @description Represents work item entities in YouTrack
 */

import type { BaseEntity, YTSet } from './core';
import type { IssueFields } from '../utils';
import type { Project } from './project';
import type { User } from './user';

/**
 * Represents a work type that can be assigned to a work item.
 * @template T The type of the work item.
 */
export class WorkItemType<T extends string> extends BaseEntity {
  /** The name of the work item type. */
  readonly name: T;
  
  /**
   * Searches for WorkItemType entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
   * @returns The set of WorkItemType entities that contain the specified extension properties.
   */
  static findByExtensionProperties<T extends string>(extensionPropertiesQuery: Record<string, unknown>): YTSet<WorkItemType<T>>;
  
  /**
   * Returns the set of work item types that are available in a project.
   * @template F The type of issue fields.
   * @template W The type of the work item.
   * @param project The project for which work item types are returned.
   * @returns The set of available work item types for the specified project.
   */
  static findByProject<F extends IssueFields, W extends string>(project: Project<F, W>): YTSet<WorkItemType<W>>;
}

/**
 * Interface representing custom work item attributes.
 */
export interface WorkItemAttributes {
  [key: string]: string | number | boolean | null;
}

/**
 * Value of a work item attribute.
 */
export class WorkItemAttributeValue extends BaseEntity {
  /** Name of the attribute value */
  readonly name: string;
  
  /**
   * Searches for WorkItemAttributeValue entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
   * @returns The set of WorkItemAttributeValue entities that contain the specified extension properties.
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<WorkItemAttributeValue>;
}

/**
 * Work item attribute configured for the project.
 */
export class WorkItemProjectAttribute extends BaseEntity {
  /** Name of the attribute. */
  readonly name: string;
  
  /** Possible values of the attribute in the project. */
  readonly values: YTSet<WorkItemAttributeValue>;
  
  /**
   * Searches for WorkItemProjectAttribute entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
   * @returns The set of WorkItemProjectAttribute entities that contain the specified extension properties.
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<WorkItemProjectAttribute>;
  
  /**
   * Returns the attribute value with the given name or null if such value does not exist.
   * @param name Name of a work item value.
   * @returns The attribute value with the given name or null if such value does not exist.
   */
  findValueByName(name: string): WorkItemAttributeValue | null;
}

/**
 * The base class for issue work items.
 * @template T The type of the work item.
 */
export class BaseWorkItem<T extends string> extends BaseEntity {
  /** The user to whom the work is attributed in the work item. */
  readonly author: User;
  
  /** The date when the work item was created. */
  readonly created: number;
  
  /** The user who added the work item to the issue. */
  readonly creator: User;
  
  /** The work item description. */
  description: string;
  
  /** The work item type. */
  type: WorkItemType<T>;
  
  /** The date when the work item was last updated. */
  readonly updated: number;
}

/**
 * Represents a work item that has been added to an issue.
 * @template T The type of the work item.
 */
export class IssueWorkItem<T extends string> extends BaseWorkItem<T> {
  /** Custom work item attributes. */
  readonly attributes: WorkItemAttributes;
  
  /** The date and time that is assigned to the work item. */
  readonly date: number;
  
  /** The duration of the work item in minutes. */
  duration: number;
  
  /**
   * Searches for IssueWorkItem entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
   * @returns The set of IssueWorkItem entities that contain the specified extension properties.
   */
  static findByExtensionProperties<T extends string>(extensionPropertiesQuery: Record<string, unknown>): YTSet<IssueWorkItem<T>>;
  
  /**
   * Permanently deletes the work item.
   */
  delete(): void;
}
