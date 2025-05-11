import type { BaseEntity, YTSet } from "./core";
import type { Project } from "./project";
import type { Issue } from "./issue";
import type { User } from "./user";

/**
 * Represents an agile board in YouTrack.
 */
export class Agile extends BaseEntity {
  /** Name of the board */
  readonly name: string;
  /** Projects associated with this board */
  readonly projects: YTSet<Project>;
  /** Sprints in this board */
  readonly sprints: YTSet<Sprint>;
  /** Owner of the board */
  readonly owner: User;
  /** Whether the board is visible to everyone */
  readonly isVisible: boolean;
  /** Current sprint of the board */
  readonly currentSprint: Sprint | null;
  
  /**
   * Creates a new sprint in this board
   * @param name Sprint name
   * @param start Start date (timestamp)
   * @param finish End date (timestamp)
   */
  createSprint(name: string, start: number, finish: number): Sprint;
  
  /**
   * Gets a sprint by name
   * @param name Sprint name
   */
  getSprint(name: string): Sprint | null;
  
  /**
   * Static method to find a board by name
   * @param name Board name
   */
  static findBoard(name: string): Agile;
}

/**
 * Represents a sprint in an agile board.
 */
export class Sprint extends BaseEntity {
  /** Name of the sprint */
  readonly name: string;
  /** Start date (timestamp) */
  readonly start: number;
  /** End date (timestamp) */
  readonly finish: number;
  /** Agile board this sprint belongs to */
  readonly agile: Agile;
  /** Status of the sprint */
  readonly status: string;
  /** Issues in this sprint */
  readonly issues: YTSet<Issue>;
  /** Whether the sprint is archived */
  readonly archived: boolean;
  
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
   * Archives the sprint
   */
  archive(): void;
}
