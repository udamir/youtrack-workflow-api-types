import type { User, UserGroup } from "./user";
import type { SavedQuery } from "./search";
import type { Project } from "./project";
import type { Issue } from "./issue";
import type { Tag } from "./tag";

/**
 * Base entity class that all YouTrack entities extend.
 */
export class BaseEntity {
	/** Unique ID of the entity */
	readonly id: string;
	/** Type of the entity */
	readonly $type: string;
	/** When true, the entity is removed in the current transaction */
	readonly becomesRemoved: boolean;
	/** When true, the entity is created in the current transaction */
	readonly isNew: boolean;

	/**
	 * Checks if this entity is equal to another entity.
	 * @param entity The entity to compare with
	 */
	isEqual(entity: BaseEntity): boolean;

	/**
	 * Checks whether a field is set to an expected value in the current transaction
	 * @param fieldName The name of the field to check
	 * @param expected The expected value
	 */
	becomes(fieldName: string, expected: string): boolean;

	/**
	 * Checks whether a user has permission to read the field
	 * @param fieldName The name of the field
	 * @param user The user for whom the permission to read the field is checked
	 */
	canBeReadBy(fieldName: string, user: User): boolean;

	/**
	 * Checks whether a user has permission to update the field
	 * @param fieldName The name of the field
	 * @param user The user for whom the permission to update the field is checked
	 */
	canBeWrittenBy(fieldName: string, user: User): boolean;

	/**
	 * Checks whether a field is equal to an expected value
	 * @param fieldName The name of the field to check
	 * @param expected The expected value
	 */
	is(fieldName: string, expected: string): boolean;

	/**
	 * Checks whether the value of a field is changed in the current transaction
	 * @param fieldName The name of the field to check
	 */
	isChanged(fieldName: string): boolean;

	/**
	 * Returns the previous value of a single-value field before an update was applied
	 * @param fieldName The name of the field
	 */
	oldValue(
		fieldName: string,
	): string | number | boolean | Date | User | BaseEntity | null;

	/**
	 * Asserts that a value is set for a field
	 * @param fieldName The name of the field to check
	 * @param message The message that is displayed to the user that describes the field requirement
	 */
	required(fieldName: string, message?: string): void;

	/**
	 * Checks whether a field was equal to an expected value prior to the current transaction
	 * @param fieldName The name of the field to check
	 * @param expected The expected value
	 */
	was(fieldName: string, expected: string): boolean;
}

/**
 * Represents the common ancestor for all persistent files that are available in YouTrack.
 * @since 2017.4.37915
 */
export class PersistentFile extends BaseEntity {
	/**
	 * The charset type of the file. Only applicable to text files.
	 * @since 2019.2.53994
	 */
	readonly charset: string;

	/**
	 * The extension that defines the file type.
	 */
	readonly extension: string;

	/**
	 * The MIME type of the file.
	 * @since 2019.2.53994
	 */
	readonly mimeType: string;

	/**
	 * The name of the file.
	 */
	readonly name: string;

	/**
	 * The size of the attached file in bytes.
	 */
	readonly size: number;

	/**
	 * Searches for PersistentFile entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery The extension properties query, defined as a set of key-value pairs
	 * representing properties and their corresponding values.
	 * @returns The set of PersistentFile entities that contain the specified extension properties.
	 * @since 2024.3.43260
	 * @example
	 * ```
	 * {
	 *   property1: "value1",
	 *   property2: "value2"
	 * }
	 * ```
	 */
	static findByExtensionProperties(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<PersistentFile>;
}

/**
 * Custom implementation of Set to handle YouTrack entity collections
 * The Set is used as storage for all multi-value objects: custom fields that store multiple values,
 * issue links, issues in a project, and so on.
 */
export class YTSet<T> {
	/** The number of elements in the Set */
	readonly size: number;
	/** Elements that are added to a field in the current transaction */
	readonly added: YTSet<T>;
	/** When the Set represents a multi-valued property of a persistent entity and the field is changed */
	readonly isChanged: boolean;
	/** Elements that are removed from a field in the current transaction */
	readonly removed: YTSet<T>;

	/**
	 * Adds a value to the set
	 * @param value The value to add
	 */
	add(value: T): this;

	/**
	 * Removes all values from the set
	 */
	clear(): void;

	/**
	 * Removes a value from the set
	 * @param value The value to remove
	 */
	delete(value: T): boolean;

	/**
	 * Returns a new Iterator object that contains the values for each element
	 */
	entries(): Iterator<T>;

	/**
	 * Find the first element in the Set for which the predicate returns true
	 * @param predicate Function to test each element
	 */
	find(predicate: (value: T) => boolean): T | undefined;

	/**
	 * Returns the first object in the collection
	 */
	first(): T | null;

	/**
	 * Executes a provided function once per each value in the Set object, in insertion order
	 * @param visitor Function to execute for each element
	 */
	forEach(visitor: (value: T, value2: T, set: YTSet<T>) => void): void;

	/**
	 * Find an element at a specific index position in the Set
	 * @param index The ordinal index of the element
	 */
	get(index: number): T | null;

	/**
	 * Checks if the set has a value
	 * @param value The value to check
	 */
	has(value: T): boolean;

	/**
	 * Checks if the Set is empty
	 */
	isEmpty(): boolean;

	/**
	 * Checks if the Set is not empty
	 */
	isNotEmpty(): boolean;

	/**
	 * Returns the last object in the collection
	 */
	last(): T | null;

	/**
	 * Returns a new Iterator object that contains the values for each element
	 */
	values(): Iterator<T>;

	/**
	 * Returns an iterator of values in the set
	 */
	[Symbol.iterator](): Iterator<T>;

	// Additional utility methods

	/**
	 * Adds all elements from other set
	 * @param other Other set to add elements from
	 */
	addAll(other: YTSet<T>): this;

	/**
	 * Removes all elements that are also in the other set
	 * @param other Other set to remove elements from
	 */
	removeAll(other: YTSet<T>): this;

	/**
	 * Returns a new set with elements common to both sets
	 * @param other Other set to find common elements with
	 */
	intersect(other: YTSet<T>): YTSet<T>;

	/**
	 * Returns array of values
	 */
	toArray(): T[];
}

/**
 * A single element in a set of Requirements.
 * @since 2025.3.21
 */
export interface Requirement {
	/**
	 * An optional issue ID, used instead of name for Issue requirements.
	 */
	id?: string;

	/**
	 * The inward name of the issue link type (equals outward name if not set).
	 */
	inward?: string;

	/**
	 * An optional login, used instead of name for User requirements.
	 */
	login?: string;

	/**
	 * An optional flag, `false` by default. If `true`, a required field must store multiple values (if applicable).
	 */
	multi?: boolean;

	/**
	 * The optional name of the field or entity. If not provided, the key (alias) for this requirement in the Requirements object is used.
	 */
	name?: string;

	/**
	 * The outward name of the issue link type (required for IssueLinkPrototype requirements).
	 */
	outward?: string;

	/**
	 * The data type of the entity.
	 * Can be one of the custom field types or system-wide entities.
	 */
	type:
		| string
		| typeof User
		| typeof UserGroup
		| typeof Project
		| typeof Issue
		| typeof Tag
		| typeof SavedQuery
		| typeof IssueLinkPrototype;

	[key: string]: string | boolean | object | undefined;
}

/**
 * A set of entities that must be present for the script to work as expected.
 * @since 2025.3.21
 */
export interface Requirements {
	/**
	 * Collection of requirements, where each key is an alias for the requirement.
	 */
	[key: string]: Requirement;
}

/**
 * An object that enables traversal through the elements in a collection.
 * @since 2025-03-21
 */
export interface Iterator<T> {
	/**
	 * Indicates whether the iterator is done
	 */
	done: boolean;
	/**
	 * The current value
	 */
	value: T | null;

	/**
	 * Returns an object that contains values for the properties `done` and `value` properties.
	 * If there are elements that were not traversed, `done` is `false` and `value` is the next element in the collection.
	 * If all of the elements were traversed, `done` is `true` and `value` is `null`.
	 */
	next(): { done: boolean; value: T | null };
}

/**
 * Represents a Gantt chart.
 * @extends BaseEntity
 * @since 2022.1
 */
export class Gantt extends BaseEntity {
	/** The name of the Gantt chart */
	readonly name: string;

	/** The user who created the Gantt chart */
	readonly owner: User;

	/** The projects that this Gantt chart works with */
	readonly projects: YTSet<Project>;

	/** The start date for the issues on the Gantt chart */
	readonly startTimestamp: number;

	/**
	 * Searches for Gantt entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery Key-value pairs representing properties and their values
	 * @returns The set of Gantt entities that contain the specified extension properties
	 * @since 2024.3.43260
	 */
	static findByExtensionProperties(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<Gantt>;

	/**
	 * Finds the most relevant chart with the specified name that is visible to the current user.
	 * @param name The name of the chart to search for
	 * @returns The most relevant chart found by name
	 */
	static findChartByName(name: string): Gantt;

	/**
	 * Adds the specified issue to the Gantt chart.
	 * @param issue The issue to add to the Gantt chart
	 */
	addIssue(issue: Issue): void;

	/**
	 * Removes the specified issue from the Gantt chart. If the issue was not present on the chart, nothing happens.
	 * @param issue The issue to remove from the Gantt chart
	 */
	removeIssue(issue: Issue): void;
}

/**
 * Represents an issue link type.
 * @extends BaseEntity
 * @since 2018.1
 */
export class IssueLinkPrototype extends BaseEntity {
	/** The inward name of the issue link type */
	readonly inward: string;

	/** The outward name of the issue link type */
	readonly outward: string;

	/**
	 * Finds an issue link type by its name.
	 * @param name Name or localized name of an issue link type
	 * @returns The issue link type
	 */
	static findByName(name: string): IssueLinkPrototype;

	/**
	 * Searches for IssueLinkPrototype entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery Key-value pairs representing properties and their values
	 * @returns The set of IssueLinkPrototype entities that contain the specified extension properties
	 */
	static findByExtensionProperties(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<IssueLinkPrototype>;
}

/**
 * Entity type for App global extension properties
 * @extends BaseEntity
 * @since 2019.1
 */
export class AppGlobalStorage extends BaseEntity {
	/**
	 * Gets the value of a property with the specified name.
	 * @param propertyName The name of the property
	 * @returns The value of the property
	 */
	getProperty(propertyName: string): string | number | boolean | object | null;

	/**
	 * Sets the value of a property with the specified name.
	 * @param propertyName The name of the property
	 * @param propertyValue The value to set
	 */
	setProperty(
		propertyName: string,
		propertyValue: string | number | boolean | object | null,
	): void;

	/**
	 * Gets all property names
	 * @returns Array of property names
	 */
	getAllPropertyNames(): string[];

	/**
	 * Searches for AppGlobalStorage entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery Key-value pairs representing properties and their values
	 * @returns The set of AppGlobalStorage entities that contain the specified extension properties
	 */
	static findByExtensionProperties(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<AppGlobalStorage>;
}
