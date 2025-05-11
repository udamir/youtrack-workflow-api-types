import type { BaseEntity, YTSet } from './core';
import type { User, UserGroup } from './user';

/**
 * Represents a common ancestor of classes that represent tags and saved searches.
 * @since 2025-03-21
 */
export class WatchFolder extends BaseEntity {
  /**
   * The groups of users for whom the tag or saved search is visible.
   */
  readonly permittedReadUserGroups: YTSet<UserGroup>;

  /**
   * The users for whom the tag or saved search is visible.
   */
  readonly permittedReadUsers: YTSet<User>;

  /**
   * The groups of users who are allowed to update the settings for the tag or saved search.
   */
  readonly permittedUpdateUserGroups: YTSet<UserGroup>;

  /**
   * The users who are allowed to update the settings for the tag or saved search.
   */
  readonly permittedUpdateUsers: YTSet<User>;

  /**
   * The group of users for whom the tag or saved search is visible.
   * If the tag or the saved search is only visible to its owner, the value for this property is `null`.
   * Use `folder.permittedReadUserGroups` and `folder.permittedReadUsers` instead.
   */
  readonly shareGroup: UserGroup | null;

  /**
   * The group of users who are allowed to update the settings for the tag or saved search.
   * If the tag or the saved search can only be updated by its owner, the value for this property is `null`.
   * Use `folder.permittedUpdateUserGroups` and `folder.permittedUpdateUsers` instead.
   */
  readonly updateShareGroup: UserGroup | null;
}

/**
 * Represents a saved search.
 * @extends WatchFolder
 * @since 2017.4.37915
 */
export class SavedQuery extends WatchFolder {
  /**
   * The name of the saved search.
   */
  readonly name: string;

  /**
   * The user who created the saved search.
   */
  readonly owner: User;

  /**
   * The search query.
   */
  readonly query: string;

  /**
   * Searches for SavedQuery entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery The extension properties query, defined as a set of key-value pairs representing properties and their corresponding values
   * @returns The set of SavedQuery entities that contain the specified extension properties
   * @since 2024.3.43260
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<SavedQuery>;

  /**
   * Finds a list of saved searches with the specified name. The list only includes saved searches that are visible to the current user.
   * The saved searches that were created by the current user are returned at the top of the list.
   * @param name The name of the saved search to search for
   * @returns A list of saved searches that match the specified name
   */
  static findByName(name: string): YTSet<SavedQuery>;

  /**
   * Finds the most relevant saved search with the specified name that is visible to the current user.
   * @param name The name of the saved search to search for
   * @returns The most relevant saved search
   */
  static findQueryByName(name: string): SavedQuery;

  /**
   * Checks whether the value of a field is changed in the current transaction.
   * @param fieldName The name of the field to check
   * @returns If the value of the field is changed in the current transaction, returns `true`
   */
  isChanged(fieldName: string): boolean;

  /**
   * Returns the previous value of a single-value field before an update was applied.
   * @param fieldName The name of the field
   * @returns If the field is changed in the current transaction, the previous value of the field. Otherwise, null
   */
  oldValue(fieldName: string): string | number | boolean | Date | User | BaseEntity | null;

  /**
   * Asserts that a value is set for a field. If a value for the required field is not set, the specified message is displayed in the user interface.
   * @param fieldName The name of the field to check
   * @param message The message that is displayed to the user that describes the field requirement
   */
  required(fieldName: string, message?: string): void;
}
