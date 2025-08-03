import type { ActionContext, Requirements, ActionUserInputType, InputStream, IssueFields, RuleContext } from "../utils";
import type { BaseEntity, YTSet, PersistentFile } from "./core";
import type { IssueWorkItem, WorkItemType } from "./workitem";
import type { PullRequest, VcsChange } from "./vcs";
import type { Calendar, Channel } from "./helpdesk";
import type { User, UserGroup } from "./user";
import type { Project } from "./project";
import type { Fields } from "./field";
import type { Tag } from "./tag";

/**
 * The base class for issue and article comments.
 */
export class BaseComment extends BaseEntity {
	/** The set of attachments that are attached to the comment. */
	readonly attachments: YTSet<PersistentFile>;

	/** Time the comment was created. */
	readonly created: number;

	/** When true, the comment is pinned in the issue. */
	isPinned: boolean;

	/** The text of the comment. */
	text: string;

	/** Time the comment was last updated. */
	readonly updated: number;
}

/**
 * Context object passed to IssueAttachment action/guard functions.
 */
export interface IssueAttachmentActionContext {
	issueAttachment: IssueAttachment;
	// Add more properties as needed for rule context
}

/**
 * Represents a file that is attached to an issue.
 */
export class IssueAttachment extends PersistentFile {
	/** The user who attached the file to the issue. */
	readonly author: User;
	/** The Base64 representation of the attachment. */
	readonly base64Content: string;
	/** The content of the file in binary form. */
	readonly content: InputStream;
	/** The date and time when the attachment was created as a timestamp. */
	readonly created: number;
	/** The URL of the issue attachment. */
	readonly fileUrl: string;
	/** If the attachment is removed, this property is true. */
	readonly isRemoved: boolean;
	/** The issue that the file is attached to. */
	readonly issue: Issue;
	/** The image dimensions or 'empty' for non-image files. */
	readonly metaData: string;
	/** The group for which the attachment is visible when restricted to a single group. */
	permittedGroup?: UserGroup;
	/** The groups for which the issue is visible when restricted to multiple groups. */
	permittedGroups?: YTSet<UserGroup>;
	/** The list of users for whom the attachment is visible. */
	permittedUsers?: YTSet<User>;
	/** The date and time the attachment was last updated as a timestamp. */
	readonly updated: number;

	/**
	 * Creates a declaration of a rule that a user can apply to an issue attachment using a menu option.
	 * @template R The type of the requirements.
	 * @template T The type of the user input.
	 * @template F The type of the issue fields.
	 * @template W The type of the workflow.
	 * @param ruleProperties JSON object that defines the properties for the rule.
	 * @returns The object representation of the rule.
	 */
	static action<R extends Requirements, T extends ActionUserInputType, F extends IssueFields, W extends string>(ruleProperties: {
		title: string;
		command: string;
		userInput?: {
			type: T;
			description?: string;
		} | null;
		guard?: (ctx: ActionContext<R, T, F, W>) => boolean;
		action: (ctx: ActionContext<R, T, F, W>) => void;
		requirements?: R;
	}): object;

	/**
	 * Searches for IssueAttachment entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
	 * @returns The set of IssueAttachment entities that contain the specified extension properties.
	 */
	static findByExtensionProperties(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<IssueAttachment>;
}

/**
 * Represents an issue in YouTrack.
 * @template F The type of the issue fields.
 * @template W The type of the workflow.
 * @template L The type of the issue link types.
 */
export class Issue<F extends IssueFields = IssueFields, W extends string = string, L extends string = string> extends BaseEntity {
	/** The text that is entered as the issue summary. */
	summary: string;

	/** The text that is entered as the issue description. */
	description: string;

	/** The project to which the issue is assigned. */
	project: Project<F, W>;

	/** The user who reported (created) the issue. */
	readonly reporter: User;

	/** A list of comments for the issue. */
	readonly comments: YTSet<IssueComment>;

	/** The custom fields that are used in an issue. */
	readonly fields: Fields<F>;

	/** The set of attachments that are attached to the issue. */
	readonly attachments: YTSet<IssueAttachment>;

	/** Issue links (e.g. `relates to`, `parent for`, etc.). Each link is a Set of Issue objects. */
	readonly links: {
		added: YTSet<Issue>;
		removed: YTSet<Issue>;
	} & Record<L, YTSet<Issue>>;

	/** The set of work items that have been added to the issue. */
	readonly workItems: YTSet<IssueWorkItem<W>>;

	/** If the issue becomes reported in the current transaction, this property is true. */
	readonly becomesReported: boolean;

	/** If the issue was previously unresolved and is assigned a state that is considered resolved in the current transaction, this property is true. */
	readonly becomesResolved: boolean;

	/** If the issue was previously resolved and is assigned a state that is considered unresolved in the current transaction, this property is true. */
	readonly becomesUnresolved: boolean;

	/** The channel used by the reporter to create the ticket. Possible values are 'FeedbackForm' for online forms or 'MailboxChannel' for email. */
	readonly channel: Channel;

	/** The date when the issue was created. */
	readonly created: number;

	/** The root issue in a tree of duplicates that are linked to the issue. */
	readonly duplicateRoot: Issue;

	/** The set of comments that are edited in the current transaction. */
	readonly editedComments: YTSet<IssueComment>;

	/** The set of work items that are edited in the current transaction. */
	readonly editedWorkItems: YTSet<IssueWorkItem<W>>;

	/** If the issue is already reported or becomes reported in the current transaction, this property is true. */
	readonly isReported: boolean;

	/** If the issue is currently assigned a state that is considered resolved, this property is true. */
	readonly isResolved: boolean;

	/** If the current user has added the 'Star' tag to watch the issue, this property is true. */
	readonly isStarred: boolean;

	/** The issue number in the project. */
	readonly numberInProject: number;

	/** The user group for which the issue is visible. If the property contains a null value, the issue is visible to the All Users group. */
	permittedGroup: UserGroup;

	/** The groups for which the issue is visible when the visibility is restricted to multiple groups. */
	permittedGroups: YTSet<UserGroup>;

	/** The list of users for whom the issue is visible. */
	permittedUsers: YTSet<User>;

	/** The set of comments that are pinned in the issue. */
	readonly pinnedComments: YTSet<IssueComment>;

	/** The list of pull requests that are associated with the issue. */
	readonly pullRequests: YTSet<PullRequest>;

	/** The date and time when the issue was assigned a state that is considered to be resolved. */
	readonly resolved: number;

	/** The list of tags that are attached to an issue. */
	readonly tags: YTSet<Tag>;

	/** When true, the ticket was created by a reporter who was not logged in to YouTrack when they submitted the support request. */
	readonly unauthenticatedReporter: boolean;

	/** The date when the issue was last updated. */
	readonly updated: number;

	/** The user who last updated the issue. */
	readonly updatedBy: User;

	/** The absolute URL that points to the issue. */
	readonly url: string;

	/** The list of commits that are associated with the issue. */
	readonly vcsChanges: YTSet<VcsChange>;

	/** Users who voted for the issue. */
	readonly voters: YTSet<User>;

	/** The number of votes for an issue. */
	readonly votes: number;

	/** Whether the issue is draft. */
	readonly isDraft: boolean;

	/**
	 * Issue constructor
	 * @param reporter Issue reporter or JSON specification
	 * @param project Project that the new issue is to belong to
	 * @param summary Issue summary
	 */
	constructor(reporter: User, project: Project<F, W>, summary: string);

	/**
	 * Creates a new issue from a JSON specification.
	 * @param json JSON specification of the issue
	 */
	constructor(json: { reporter: User; project: Project<F, W>; summary: string });

	/**
	 * Creates a declaration of a rule that a user can apply to one or more issues with a command or menu option.
	 * @template R The type of the requirements.
	 * @template T The type of the user input.
	 * @template F The type of the issue fields.
	 * @template W The type of the workflow.
	 * @param ruleProperties A JSON object that defines the properties for the rule
	 * @returns The object representation of the rule
	 */
	static action<R extends Requirements, T extends ActionUserInputType, F extends IssueFields, W extends string>(ruleProperties: {
		title: string;
		command: string;
		userInput?: {
			type: T;
			description?: string;
		} | null;
		guard?: (ctx: ActionContext<R, T, F, W>) => boolean;
		action: (ctx: ActionContext<R, T, F, W>) => void;
		requirements?: R;
	}): object;

	/**
	 * Creates a new issue draft.
	 * @param project Project that the new issue draft is to belong to
	 * @param reporter Issue draft reporter
	 * @returns Newly created issue draft
	 * @since 2025.1
	 */
	static createDraft<F extends IssueFields, W extends string, L extends string>(project: Project<F, W>, reporter: User): Issue<F, W, L>;

	/**
	 * Creates a new shared issue draft.
	 * @param project Project that the new issue draft is to belong to
	 * @returns Newly created issue draft
	 * @since 2025.1
	 */
	static createSharedDraft<F extends IssueFields, W extends string, L extends string>(project: Project<F, W>): Issue<F, W, L>;

	/**
	 * Searches for Issue entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery The extension properties query, defined as a set of key-value pairs representing properties and their corresponding values
	 * @returns The set of Issue entities that contain the specified extension properties
	 * @since 2024.3.43260
	 */
	static findByExtensionProperties<F extends IssueFields, W extends string, L extends string>(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<Issue<F, W, L>>;

	/**
	 * Finds an issue by its visible ID.
	 * @param id The issue ID
	 * @returns The issue that is assigned the specified ID
	 */
	static findById<F extends IssueFields, W extends string, L extends string>(id: string): Issue<F, W, L>;

	/**
	 * Creates a declaration of a rule that is triggered when a change is applied to an issue.
	 * @template R The type of the requirements.
	 * @template F The type of the issue fields.
	 * @template W The type of the workflow.
	 * @param ruleProperties A JSON object that defines the properties for the rule
	 * @returns The object representation of the rule
	 */
	static onChange<R extends Requirements, F extends IssueFields, W extends string>(ruleProperties: {
		title: string;
		guard?: (ctx: RuleContext<R, F, W>) => boolean;
		action: (ctx: RuleContext<R, F, W>) => void;
		requirements?: R;
		runOn?: {
			change?: boolean;
			removal?: boolean;
		};
	}): object;

	/**
	 * Creates a declaration of a rule that is triggered on a set schedule.
	 * @template R The type of the requirements.
	 * @template F The type of the issue fields.
	 * @template W The type of the workflow.
	 * @param ruleProperties A JSON object that defines the properties for the rule
	 * @returns The object representation of the rule
	 */
	static onSchedule<R extends Requirements, F extends IssueFields, W extends string>(ruleProperties: {
		title: string;
		search: string | (() => string);
		cron: string;
		muteUpdateNotifications?: boolean;
		modifyUpdatedProperties?: boolean;
		guard?: (ctx: RuleContext<R, F, W>) => boolean;
		action: (ctx: RuleContext<R, F, W>) => void;
		requirements?: R;
	}): object;

	/**
	 * Creates a declaration of a custom SLA policy. An SLA policy defines the time goals for the replies from staff and request resolution.
	 * @template R The type of the requirements.
	 * @template F The type of the issue fields.
	 * @template W The type of the workflow.
	 * @param ruleProperties A JSON object that defines the properties for the SLA policy
	 * @returns The object representation of the SLA policy
	 */
	static sla<R extends Requirements, F extends IssueFields, W extends string>(ruleProperties: {
		title: string;
		guard?: (ctx: RuleContext<R, F, W>) => boolean;
		onEnter?: (ctx: RuleContext<R, F, W>) => void;
		action?: (ctx: RuleContext<R, F, W>) => void;
		onBreach?: (ctx: RuleContext<R, F, W>) => void;
		requirements?: R;
	}): object;

	/**
	 * Creates a declaration of a state-machine rule. The state-machine imposes restrictions for the transitions between values in a custom field.
	 * @param ruleProperties A JSON object that defines the properties for the rule
	 * @returns The object representation of the rule
	 */
	static stateMachine(ruleProperties: {
		title: string;
		fieldName?: string;
		stateFieldName?: string;
		states?: object;
		defaultMachine?: object;
		typeFieldName?: string;
		alternativeMachines?: object;
		requirements?: Requirements;
	}): object;

	/**
	 * Attaches a file to the issue. Makes `issue.attachments.isChanged` return `true` for the current transaction.
	 * @param content The content of the file in binary or base64 form
	 * @param name The name of the file
	 * @param charset The charset of the file. Only applicable to text files
	 * @param mimeType The MIME type of the file
	 * @returns The attachment that is added to the issue
	 */
	addAttachment(
		content: InputStream | string,
		name: string,
		charset?: string,
		mimeType?: string,
	): IssueAttachment;

	/**
	 * Attaches a file to the issue using JSON specification.
	 * @param json JSON specification of the attachment
	 * @returns The attachment that is added to the issue
	 */
	addAttachment(json: {
		content: InputStream | string;
		name: string;
		charset?: string;
		mimeType?: string;
	}): IssueAttachment;

	/**
	 * Adds a comment to the issue. Makes `issue.comments.isChanged` return `true` for the current transaction.
	 * @param text The text to add to the issue as a comment
	 * @param author The author of the comment
	 * @returns A newly created comment
	 */
	addComment(text: string, author?: User): IssueComment;

	/**
	 * Adds a comment to the issue using JSON specification.
	 * @param json JSON specification of the comment
	 * @returns A newly created comment
	 */
	addComment(json: { text: string; author?: User }): IssueComment;

	/**
	 * Adds a tag with the specified name to an issue. YouTrack adds the first matching tag that is visible to the current user.
	 * @param name The name of the tag to add to the issue
	 * @returns The tag that has been added to the issue
	 */
	addTag(name: string): Tag;

	/**
	 * Adds a work item to the issue.
	 * @param description The description of the work item
	 * @param date The date that is assigned to the work item
	 * @param author The user who performed the work
	 * @param duration The work duration in minutes
	 * @param type The work item type
	 * @returns The new work item
	 */
	addWorkItem(
		description: string,
		date: number,
		author: User,
		duration: number,
		type: WorkItemType<W>,
	): IssueWorkItem<W>;

	/**
	 * Adds a work item to the issue using JSON specification.
	 * @param json JSON specification of the work item
	 * @returns The new work item
	 */
	addWorkItem(json: {
		description: string;
		date: number;
		author: User;
		duration: number;
		type: WorkItemType<W>;
	}): IssueWorkItem<W>;

	/**
	 * Applies a command to the issue.
	 * @param command The command that is applied to the issue
	 * @param runAs Specifies the user by which the command is applied. If this parameter is not set, the command is applied on behalf of the current user
	 */
	applyCommand(command: string, runAs?: User): void;

	/**
	 * Removes all of the attachments from the issue.
	 */
	clearAttachments(): void;

	/**
	 * Checks whether the value of a field is changed in the current transaction.
	 * @param fieldName The name of the field to check
	 * @returns If the value of the field is changed in the current transaction, returns `true`
	 */
	isChanged<K extends keyof F>(fieldName: K): boolean;

	/**
	 * Returns the previous value of a single-value field before an update was applied.
	 * @param fieldName The name of the field
	 * @returns If the field is changed in the current transaction, the previous value of the field. Otherwise, null
	 */
	oldValue<K extends keyof F>(fieldName: K): F[K] | null;

	/**
	 * Pauses the timers for the current SLA applied to the issue.
	 * @since 2023.1
	 */
	pauseSLA(): void;

	/**
	 * Removes a tag with the specified name from an issue.
	 * @param name The name of the tag to remove from the issue
	 * @returns The tag that has been removed from the issue
	 */
	removeTag(name: string): Tag;

	/**
	 * Asserts that a value is set for a field. If a value for the required field is not set, the specified message is displayed in the user interface.
	 * @param fieldName The name of the field to check
	 * @param message The message that is displayed to the user that describes the field requirement
	 */
	required<K extends keyof F>(fieldName: K, message?: string): void;

	/**
	 * Checks whether a field was equal to an expected value prior to the current transaction.
	 * @param fieldName The name of the field to check
	 * @param expected The expected value
	 * @returns If the field was equal to the expected value, returns `true`
	 */
	was<K extends keyof F>(fieldName: K, expected: F[K]): boolean;

	/**
	 * Adds the specified number of minutes to a specified starting point in time.
	 * @param initialTime A timestamp for the starting point in time
	 * @param minutes The number of minutes to add to the starting point
	 * @param calendar The SLA settings for the business hours
	 * @param considerPauses A switcher that determines whether to consider the effects of the 'pauseSLA' and 'resumeSLA' methods
	 * @returns A timestamp after adding the specified number of minutes
	 * @since 2023.1
	 */
	afterMinutes(
		initialTime: number,
		minutes: number,
		calendar: Calendar,
		considerPauses?: boolean,
	): number;

	/**
	 * Creates a copy of the issue.
	 * @param project Project to create new issue in
	 * @returns The copy of the original issue
	 */
	copy(project?: Project<F, W, L>): Issue<F, W, L>;

	/**
	 * Checks whether the specified tag is attached to an issue.
	 * @param tagName The name of the tag to check for the issue
	 * @returns If the specified tag is attached to the issue, returns `true`
	 */
	hasTag(tagName: string): boolean;

	/**
	 * Checks whether the issue is accessible by specified user.
	 * @param user The user to check
	 * @returns If the issue is accessible for the user, returns 'true'
	 */
	isVisibleTo(user: User): boolean;

	/**
	 * Converts text in markdown to HTML.
	 * @param text The string of text to convert to HTML
	 * @returns Rendered markdown
	 */
	renderMarkup(text: string): string;

	/**
	 * Resumes the timers for the current SLA applied to the issue.
	 */
	resumeSLA(): void;
}

/**
 * Context object passed to IssueComment action/guard functions.
 */
export interface IssueCommentActionContext {
	issueComment: IssueComment;
	// Add more properties as needed for rule context
}

/**
 * Represents a comment that is added to an issue.
 * @extends BaseComment
 */
export class IssueComment extends BaseComment {
	/** The user who created the comment. */
	readonly author: User;

	/** True in case the comment is displayed as removed. */
	readonly deleted: boolean;

	/** The issue the comment belongs to. */
	readonly issue: Issue;

	/** A group who's members are allowed to access the comment. */
	permittedGroup?: UserGroup;

	/** Groups whose members are allowed to access the comment. */
	permittedGroups?: YTSet<UserGroup>;

	/** Users who are allowed to access the comment. */
	permittedUsers?: YTSet<User>;

	/** The user who last updated the comment. */
	readonly updatedBy: User;

	/** The absolute URL (permalink) that points to the comment. */
	readonly url: string;

	/**
	 * Creates a declaration of a rule that a user can apply to an issue comment using a menu option.
	 * @template R The type of the requirements.
	 * @template T The type of the user input.
	 * @template F The type of the issue fields.
	 * @template W The type of the workflow.
	 * @param ruleProperties JSON object that defines the properties for the rule.
	 * @returns The object representation of the rule.
	 */
	static action<R extends Requirements, T extends ActionUserInputType, F extends IssueFields, W extends string>(ruleProperties: {
		title: string;
		command: string;
		userInput?: {
			type: T;
			description?: string;
		} | null;
		guard?: (ctx: ActionContext<R, T, F, W> & IssueCommentActionContext) => boolean;
		action: (ctx: ActionContext<R, T, F, W> & IssueCommentActionContext) => void;
		requirements?: R;
	}): object;

	/**
	 * Searches for IssueComment entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
	 * @returns The set of IssueComment entities that contain the specified extension properties.
	 */
	static findByExtensionProperties(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<IssueComment>;

	/**
	 * Attaches a file to the issue comment.
	 * @param content The content of the file in binary or base64 form.
	 * @param name The name of the file.
	 * @param charset The charset of the file.
	 * @param mimeType The MIME type of the file.
	 * @returns The attachment that is added to the issue comment.
	 */
	addAttachment(
		content: InputStream | string,
		name: string,
		charset?: string,
		mimeType?: string,
	): IssueAttachment;

	/**
	 * Attaches a file to the issue using JSON specification.
	 * @param json JSON specification of the attachment
	 * @returns The attachment that is added to the issue
	 */
	addAttachment(json: {
		content: InputStream | string;
		name: string;
		charset?: string;
		mimeType?: string;
	}): IssueAttachment;

	/**
	 * Logically deletes the comment.
	 * The comment is marked as deleted, but remains in the database.
	 */
	delete(): void;

	/**
	 * Checks whether the specified user has access to view the comment.
	 * @param user The user to check.
	 * @returns When true, the specified user has access to view the comment.
	 */
	isVisibleTo(user: User): boolean;
}
