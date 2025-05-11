/**
 * @file User type definitions for YouTrack API
 * @description Represents a user account in YouTrack, based on 2025-04-03 documentation
 */

import type { BaseEntity, YTSet } from './core';
import type { BaseArticle } from './articles';
import type { Project } from './project';
import type { Issue } from './issue';
import type { Tag } from './tag';

/**
 * Interface for user attributes
 */
interface UserAttributes {
  [key: string]: string | number | boolean | null;
}

/**
 * Represents a user account in YouTrack.
 */
export class User extends BaseEntity {
  /**
   * The current (logged in) user.
   */
  static readonly current: User;

  /**
   * Field type. Used when defining rule requirements.
   */
  static readonly fieldType: string;

  /**
   * Custom user attributes.
   * @since 2021.1.7000
   */
  readonly attributes: UserAttributes;

  /**
   * The absolute URL of the image that is used as the avatar for a user account.
   * May point to an external service, like Gravatar.
   * @since 2019.3
   */
  readonly avatarUrl: string;

  /**
   * The email address of the user.
   */
  readonly email: string;

  /**
   * First day of week as set in the user's profile settings.
   * 0 is for Sunday, 1 is for Monday, etc.
   * @since 2019.1.50122
   */
  readonly firstDayOfWeeks: number;

  /**
   * The full name of the user as seen in their profile.
   */
  readonly fullName: string;

  /**
   * If the user is currently banned, this property is `true`.
   */
  readonly isBanned: boolean;

  /**
   * Indicates whether the user has a verified email address in their profile.
   * @since 2023.1
   */
  readonly isEmailVerified: boolean;

  /**
   * If the user has interacted with YouTrack in any way within the last five minutes.
   * @since 2022.1
   */
  readonly isOnline: boolean;

  /**
   * When `true`, the user functions as a system user.
   * System users are user accounts utilized for running imports, integrations, and other automations.
   * @since 2022.2
   */
  readonly isSystem: boolean;

  /**
   * The display language selected in the general settings of the user profile.
   * @since 2022.1
   */
  readonly language: string;

  /**
   * The login of the user.
   */
  readonly login: string;

  /**
   * The date when the user was registered.
   * @since 2024.3
   */
  readonly registered: number;

  /**
   * ID of the user in Hub. You can use this ID for operations in Hub,
   * and for matching users between YouTrack and Hub.
   * @since 2020.6.3000
   */
  readonly ringId: string;

  /**
   * The ID of the local time zone selected in the general settings of the user profile.
   */
  readonly timeZoneId: string;

  /**
   * The full name of the user or the login if the full name is not set.
   */
  readonly visibleName: string;

  /**
   * Finds users by email.
   * @param email The email to search for.
   * @returns Users with the specified email.
   * @since 2018.2.41100
   */
  static findByEmail(email: string): YTSet<User>;

  /**
   * Searches for User entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery The extension properties query, defined as a set of key-value 
   * pairs representing properties and their corresponding values.
   * @returns The set of User entities that contain the specified extension properties.
   * @since 2024.3.43260
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<User>;

  /**
   * Finds a user by login.
   * @param login The login of the user account to search for.
   * @returns The specified user, or null when a user with the specified login is not found.
   */
  static findByLogin(login: string): User | null;

  /**
   * Finds a user by email.
   * @param email The email of the user account to search for.
   * @returns The specified user, or null when a user with the specified email is not found 
   * or there are multiple users with the specified email.
   * @since 2018.2.41100
   */
  static findUniqueByEmail(email: string): User | null;

  /**
   * Checks whether the user is able to remove their vote from the specified issue.
   * @param issue The issue to check.
   * @returns If the user can vote for the issue, returns `true`.
   */
  canUnvoteIssue(issue: Issue): boolean;

  /**
   * Checks whether the user is able to vote for the specified issue.
   * @param issue The issue to check.
   * @returns If the user can vote for the issue, returns `true`.
   */
  canVoteIssue(issue: Issue): boolean;

  /**
   * Returns a tag with the specified name that is shared with but not owned by the user.
   * If such a tag does not exist, a null value is returned.
   * @param name The name of the tag.
   * @returns The tag.
   */
  getSharedTag(name: string): Tag | null;

  /**
   * Returns a tag that is visible to the user.
   * @param name The name of the tag.
   * @param createIfNotExists If `true` and the specified tag does not exist or is not visible 
   * to the user and the user has permission to create tags, a new tag with the specified name is created.
   * @returns The tag.
   */
  getTag(name: string, createIfNotExists?: boolean): Tag | null;

  /**
   * Checks whether the user is granted the specified role in the specified project.
   * When the project parameter is not specified, checks whether the user has the specified role in any project.
   * @param roleName The name of the role to check for.
   * @param project The project to check for the specified role assignment. 
   * If omitted, checks if the user has the global role.
   * @returns If the user is granted the specified role, returns `true`.
   */
  hasRole(roleName: string, project?: Project): boolean;

  /**
   * Checks whether the user is a member of the specified group.
   * @param groupName The name of the group to check for.
   * @returns If the user is a member of the specified group, returns `true`.
   */
  isInGroup(groupName: string): boolean;

  /**
   * Sends an email notification to the email address that is set in the user profile.
   * @param subject The subject line of the email notification.
   * @param body The message text of the email notification.
   * @param ignoreNotifyOnOwnChangesSetting If `false`, the message is not sent when changes 
   * are performed on behalf of the current user. Otherwise, the message is sent anyway.
   * @param project When set, the email address that is used as the 'From' address for 
   * the specified project is used to send the message.
   */
  notify(subject: string, body?: string, 
         ignoreNotifyOnOwnChangesSetting?: boolean, project?: Project): void;

  /**
   * Sends an email notification to the email address that is set in the user profile.
   * @param json JSON notification parameters.
   */
  notify(json: { subject: string; body: string; ignoreNotifyOnOwnChangesSetting?: boolean; project?: Project }): void;

  /**
   * Sends a notification to all notification channels configured for the user.
   * @param caseName The name of the notification case as seen on the notification templates configuration page.
   * @param parameters A JSON object that provides required parameters for the notification to render. 
   * Particular parameters depend on the notification case.
   * @param projectDocument An issue or an article that this notification is about.
   * @since 2023.1
   */
  notifyOnCase(caseName: string, parameters: Record<string, unknown>, projectDocument?: Issue | BaseArticle): void;

  /**
   * Sends an email notification to the email address that is set in the user profile.
   * An alias for notify(subject, body, true).
   * @param subject The subject line of the email notification.
   * @param body The message text of the email notification.
   */
  sendMail(subject: string, body: string): void;

  /**
   * Removes a vote on behalf of the user from the issue, if allowed.
   * @param issue The issue from which the vote is removed.
   */
  unvoteIssue(issue: Issue): void;

  /**
   * Removes the current user from the list of watchers for the article (removes the `Star` tag).
   * @param article The article from which the user is removed as a watcher.
   * @since 2023.1
   */
  unwatchArticle(article: BaseArticle): void;

  /**
   * Removes the current user from the list of watchers for the issue (removes the `Star` tag).
   * @param issue The issue from which the user is removed as a watcher.
   */
  unwatchIssue(issue: Issue): void;

  /**
   * Adds a vote on behalf of the user to the issue, if allowed.
   * @param issue The issue to which the vote is added.
   */
  voteIssue(issue: Issue): void;

  /**
   * Adds the current user to the article as a watcher (adds the `Star` tag).
   * @param article The article to which the user is added as a watcher.
   * @since 2023.1
   */
  watchArticle(article: BaseArticle): void;

  /**
   * Adds the current user to the issue as a watcher (adds the `Star` tag).
   * @param issue The issue to which the user is added as a watcher.
   */
  watchIssue(issue: Issue): void;
}

/**
 * Represents a group of users.
 * @extends BaseEntity
 */
export class UserGroup extends BaseEntity {
  /**
   * The All Users group.
   */
  static readonly allUsersGroup: UserGroup;

  /**
   * Field type. Used when defining rule requirements.
   */
  static readonly fieldType: string;

  /**
   * The description of the group.
   */
  readonly description: string;

  /**
   * If the group is the All Users group, this property is `true`.
   */
  readonly isAllUsersGroup: boolean;

  /**
   * If the auto-join option is enabled for the group, this property is `true`.
   */
  readonly isAutoJoin: boolean;

  /**
   * The name of the group.
   */
  readonly name: string;

  /**
   * A list of users who are members of the group.
   */
  readonly users: YTSet<User>;

  /**
   * Searches for UserGroup entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery The extension properties query, defined as a set of key-value pairs.
   * @returns The set of UserGroup entities that contain the specified extension properties.
   * @since 2024.3.43260
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<UserGroup>;

  /**
   * Finds a group by name.
   * @param name The name of the group to search for.
   * @returns The specified user group, or null when a group with the specified name is not found.
   */
  static findByName(name: string): UserGroup | null;

  /**
   * Sends an email notification to all of the users who are members of the group.
   * @param subject The subject line of the email notification.
   * @param body The message text of the email notification.
   * @example
   * ```
   * issue.oldValue('permittedGroup').notifyAllUsers('Visibility has been changed',
   *   'The visibility group for the issue ' + issue.getId() +
   *   ' has been changed to ' + permittedGroup.name);
   * ```
   */
  notifyAllUsers(subject: string, body: string): void;
}

/**
 * Represents a project team.
 * @extends UserGroup
 * @since 2019.1
 */
export class ProjectTeam extends UserGroup {
  /**
   * Searches for ProjectTeam entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery The extension properties query, defined as a set of key-value pairs
   * @returns The set of ProjectTeam entities that contain the specified extension properties
   * @since 2024.3.43260
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<ProjectTeam>;
}
