/**
 * @file Project type definitions for YouTrack API
 * @description Represents project entities in YouTrack
 */

import type { WorkItemProjectAttribute } from "./workitem";
import type { ProjectCustomField } from "./field";
import type { BaseEntity, YTSet } from "./core";
import type { ChangesProcessor } from "./vcs";
import type { User, UserGroup } from "./user";
import type { IssueFields } from "../utils";
import type { Article } from "./articles";
import type { Issue } from "./issue";

/**
 * Enum for project types
 */
export enum ProjectType {
	Standard = "standard",
	Helpdesk = "helpdesk",
}

/**
 * Represents a YouTrack project.
 * @template F The type of issue fields.
 * @template W The type of work item types.
 */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class Project<F extends IssueFields = any, W extends string = string> extends BaseEntity {
	/**
	 * A list of all articles that belong to the project.
	 */
	readonly articles: YTSet<Article>;

	/**
	 * The list of VCS change processors that are integrated with the project.
	 */
	readonly changesProcessors: YTSet<ChangesProcessor>;

	/**
	 * The description of the project as shown on the project profile page.
	 */
	readonly description: string;

	/**
	 * The set of custom fields that are available in the project.
	 */
	readonly fields: YTSet<ProjectCustomField>;

	/**
	 * If the project is currently archived, this property is `true`.
	 */
	readonly isArchived: boolean;

	/**
	 * A list of all issues that belong to the project.
	 */
	readonly issues: YTSet<Issue<F, W>>;

	/**
	 * The ID of the project. Use instead of project.shortName, which is deprecated.
	 */
	readonly key: string;

	/**
	 * The user who is set as the project owner.
	 */
	readonly leader: User;

	/**
	 * The name of the project.
	 */
	readonly name: string;

	/**
	 * The email address that is used to send notifications for the project.
	 * If a 'From' address is not set for the project, the default 'From' address
	 * for the YouTrack server is returned.
	 */
	readonly notificationEmail: string;

	/**
	 * Determines which basic features are available for use in a project.
	 * Possible values are 'standard' or 'helpdesk'.
	 */
	readonly projectType: ProjectType;

	/**
	 * Short name of the project (deprecated, use key instead).
	 */
	readonly shortName: string;

	/**
	 * A UserGroup object that contains the users and members of groups who are assigned to the project team.
	 */
	readonly team: UserGroup;

	/**
	 * Work item attributes configured for the project.
	 */
	readonly workItemAttributes: YTSet<WorkItemProjectAttribute>;

	/**
	 * Searches for Project entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery The extension properties query, defined as a set of key-value pairs
	 * representing properties and their corresponding values.
	 * @returns The set of Project entities that contain the specified extension properties.
	 * @since 2024.3.43260
	 * @example
	 * ```
	 * {
	 *   property1: "value1",
	 *   property2: "value2"
	 * }
	 * ```
	 */
	static findByExtensionProperties<F extends IssueFields, W extends string = string>(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<Project<F, W>>;

	/**
	 * Finds a project by ID.
	 * @template F The type of issue fields.
	 * @template W The type of work item types.
	 * @param key The ID of the project to search for.
	 * @returns The project, or null when there are no projects with the specified ID.
	 */
	static findByKey<F extends IssueFields, W extends string = string>(key: string): Project<F, W> | null;

	/**
	 * Finds a project by name.
	 * @template F The type of issue fields.
	 * @template W The type of work item types.
	 * @param name The name of the project to search for.
	 * @returns The project, or null when there are no projects with the specified name.
	 */
	static findByName<F extends IssueFields, W extends string = string>(name: string): Project<F, W> | null;

	/**
	 * Returns the custom field in the project with the specified name.
	 * @param name The name of the custom field.
	 * @returns The custom field with the specified name.
	 */
	findFieldByName(name: string): ProjectCustomField;

	/**
	 * Returns work item attribute with the given name or null if it does not exist.
	 * @param name Name of the attribute to find by
	 * @returns Work item attribute with the given name or null if it does not exist.
	 */
	findWorkItemAttributeByName(name: string): WorkItemProjectAttribute | null;

	/**
	 * Gets the number of minutes that occurred during working hours in a specified interval.
	 * For example, if the interval is two days and the number of working hours in a day is set to 8,
	 * the result is 2 * 8 * 60 = 960
	 * @param start Start of the interval.
	 * @param end End of the interval.
	 * @returns The number of minutes that occurred during working hours in the specified interval.
	 */
	intervalToWorkingMinutes(start: number, end: number): number;

	/**
	 * Checks if the specified user is an agent in the project.
	 * @param user The user to check.
	 * @returns If the specified user is added to agents in the project, returns 'true'.
	 */
	isAgent(user: User): boolean;

	/**
	 * Creates a new issue draft.
	 * @param reporter Issue draft reporter.
	 * @returns Newly created issue draft.
	 */
	newDraft(reporter: User): Issue<F, W>;
}
