/**
 * @file VCS type definitions for YouTrack API
 * @description Represents VCS entities in YouTrack
 */

import type { BaseEntity, YTSet } from './core';
import type { User } from './user';

/**
 * Enum representing pull request state values
 * @since 2020.3
 */
export enum PullRequestStateEnum {
  OPEN = 'OPEN',
  MERGED = 'MERGED',
  DECLINED = 'DECLINED',
  UNKNOWN = 'UNKNOWN'
}

/**
 * Represents a pull request state.
 * @extends BaseEntity
 * @since 2020.3
 */
export class PullRequestState extends BaseEntity {
  /** The pull request was declined */
  static readonly DECLINED: PullRequestState;
  
  /** The pull request was merged */
  static readonly MERGED: PullRequestState;
  
  /** The pull request is open */
  static readonly OPEN: PullRequestState;
  
  /** Name of the pull request state */
  readonly name: string;
  
  /**
   * Searches for PullRequestState entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
   * @returns The set of PullRequestState entities that contain the specified extension properties.
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<PullRequestState>;
}

/**
 * Represents a VCS server.
 * @extends BaseEntity
 * @since 2018.1.38923
 */
export class VcsServer extends BaseEntity {
  /** The URL of the VCS server */
  readonly url: string;
}

/**
 * An entity that retrieves VCS changes and creates their representation in YouTrack.
 * @extends BaseEntity
 * @since 2018.1.38923
 */
export class ChangesProcessor extends BaseEntity {
  /** The list of pull requests that are associated with the changes processor */
  readonly pullRequests: YTSet<PullRequest>;
  
  /** The VCS server that the processor connects to */
  readonly server: VcsServer;
  
  /** The URL of the change processor */
  readonly url: string;
  
  /** The list of commits that are associated with the changes processor */
  readonly vcsChanges: YTSet<VcsChange>;
}

/**
 * Represents VCS-related items such as commits and pull requests.
 * @extends BaseEntity
 * @since 2018.1.38923
 */
export class AbstractVcsItem extends BaseEntity {
  /** The name of the branch that the VCS change was committed to */
  readonly branch: string;
  
  /** The commit message or pull request description that was provided when the change was applied to the VCS */
  readonly text: string;
  
  /** The user who authored the VCS change */
  readonly user: User;
  
  /** The name of the change author, as returned by the VCS */
  readonly userName: string;
}

/**
 * Represents a commit that is attached to an issue.
 * @extends AbstractVcsItem
 * @since 2018.1.38923
 */
export class VcsChange extends AbstractVcsItem {
  /** The list of change processors that the VCS change can be retrieved from */
  readonly changesProcessors: YTSet<ChangesProcessor>;
  
  /** The date when the change was applied, as returned by the VCS */
  readonly created: number;
  
  /** @deprecated Use VcsChange.created instead */
  readonly date: number;
  
  /** The date when the VCS change was retrieved from the change processor */
  readonly fetched: number;
  
  /** A unique identifier. Used by some CI servers in addition to version */
  readonly vcsId: number;
  
  /** The version number of the change. For a Git-based VCS, the revision hash */
  readonly version: string;
  
  /**
   * Searches for VcsChange entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
   * @returns The set of VcsChange entities that contain the specified extension properties.
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<VcsChange>;
}

/**
 * Represents a pull or merge request that is attached to an issue.
 * @extends AbstractVcsItem
 * @since 2020.3
 */
export class PullRequest extends AbstractVcsItem {
  /** The date when the pull request was retrieved from the VCS change processor */
  readonly fetched: number;
  
  /** A unique identifier */
  readonly id: string;
  
  /** Human readable id of pull-request */
  readonly idReadable: string;
  
  /** The previous state of the pull request */
  readonly previousState: PullRequestState;
  
  /** The processor for VCS changes that transmitted information about the pull request */
  readonly processor: ChangesProcessor;
  
  /** The state of the pull request */
  readonly state: PullRequestState;
  
  /** The title of the pull request */
  readonly title: string;
  
  /** The URL of the pull request */
  readonly url: string;
  
  /**
   * Searches for PullRequest entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
   * @returns The set of PullRequest entities that contain the specified extension properties.
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<PullRequest>;
}