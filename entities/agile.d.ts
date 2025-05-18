import type { BaseEntity, YTSet } from "./core";
import type { Issue } from "./issue";
import type { User } from "./user";

/**
 * Represents an agile board in YouTrack.
 */
export class Agile<T extends string = string> extends BaseEntity {
  /** Name of the board */
  readonly name: string;
  /** Sprints in this board */
  readonly sprints: YTSet<Sprint<T>>;
  /** Author of the board */
  readonly author: User;
  /** Current sprint of the board */
  readonly currentSprint: Sprint<T> | null;
  
  /**
   * Creates a new sprint in this board
   * @param name Sprint name
   * @param start Start date (timestamp)
   * @param finish End date (timestamp)
   */
  createSprint(name: string, start: number, finish: number): Sprint<T>;
  
  /**
   * Finds a sprint by name
   * @param name Sprint name
   * @returns Sprint or null if not found
   */
  findSprintByName(name: string): Sprint<T> | null;

  /**
   * Gets all sprints of this board where the issue belongs.
   * @param issue The issue for which you want to get the sprints that it is assigned to.
   */
  getSprints(issue: Issue): YTSet<Sprint<T>>;
  
  /**
   * Adds the issue to the current sprint of the board.
   * @param issue Issue to add
   */
  addIssue(issue: Issue): void;

  /**
   * Removes the issue from the current sprint of the board.
   * @param issue Issue to remove
   */
  removeIssue(issue: Issue): void;
  /**
   * Returns a set of sprints to which the issue has been added.
   * @param issue The issue for which added sprints are returned.
   */
  getAddedSprints(issue: Issue): YTSet<Sprint<T>>;

  /**
   * Returns the sprints that an issue is assigned to on an agile board.
   * @param issue The issue for which you want to get the sprints that it is assigned to.
   */
  getIssueSprints(issue: Issue): YTSet<Sprint<T>>;

  /**
   * Gets all sprints of this board from which the issue is removed during the current transaction.
   * @param issue The issue for which removed sprints are returned.
   */
  getRemovedSprints(issue: Issue): YTSet<Sprint<T>>;

  /**
   * Static method to find a board by name
   * @param name Board name
   */
  static findByName<T extends string>(name: string): YTSet<Agile<T>>;
}

/**
 * Represents a sprint in an agile board.
 */
export class Sprint<T extends string = string> extends BaseEntity {
  /** Name of the sprint */
  readonly name: T;
  /** Start date (timestamp) */
  readonly start: number;
  /** End date (timestamp) */
  readonly finish: number;
  /** Agile board this sprint belongs to */
  readonly agile: Agile<T>;
  /** Whether the sprint is archived */
  readonly isArchived: boolean;
  
  /**
   * Adds an issue to the sprint
   * @param issue Issue to add
   */
  addIssue(issue: Issue): void;
  
  /**
   * Removes an issue from the sprint
   * @param issue Issue to remove
   */
  removeIssue(issue: Issue): void;
  
  /**
   * Checks whether the specified issue is represented as a swimlane on the agile board that the sprint belongs to.
   * @param issue The issue for which you want to check if it is a swimlane
   */
  isSwimlane(issue: Issue): boolean;
}
