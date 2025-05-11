/**
 * @file Tag type definitions for YouTrack API
 * @description Represents tag and watch folder entities in YouTrack
 */

import type { User, UserGroup } from './user';
import { WatchFolder } from './search';
import type { YTSet } from './core';

/**
 * Represents a tag in YouTrack.
 * @since 2025-04-03
 */
export class Tag extends WatchFolder {
  /**
   * The name of the tag.
   */
  readonly name: string;

  /**
   * The user who created the tag.
   */
  readonly owner: User;

  /**
   * The groups of users who can apply the tag.
   * @since 2022.1
   */
  readonly permittedTagUserGroups: YTSet<UserGroup>;

  /**
   * The users who can apply the tag.
   * @since 2022.1
   */
  readonly permittedTagUsers: YTSet<User>;

  /**
   * Searches for Tag entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery The extension properties query, defined as a set of key-value pairs 
   * representing properties and their corresponding values.
   * @returns The set of Tag entities that contain the specified extension properties.
   * @since 2024.3.43260
   * @example
   * ```
   * {
   *   property1: "value1",
   *   property2: "value2"
   * }
   * ```
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<Tag>;

  /**
   * Finds a list of tags with the specified name. The list only includes tags that are visible to the current user.
   * The tags that were created by the current user are returned at the top of the list.
   * "Star" tag is excluded from the results.
   * @param name The name of the tag to search for.
   * @returns A list of tags that match the specified name.
   */
  static findByName(name: string): YTSet<Tag>;

  /**
   * Finds the most relevant tag with the specified name that is visible to the current user.
   * "Star" tag is excluded from the results.
   * @param name The name of the tag to search for.
   * @returns The most relevant tag.
   */
  static findTagByName(name: string): Tag;
}
