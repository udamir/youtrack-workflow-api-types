/**
 * @file Field type definitions for YouTrack API
 * @description Represents field and custom field entities in YouTrack
 */

import type { FieldType, IssueFields } from "../utils";
import type { BaseEntity, YTSet } from "./core";
import type { User, UserGroup } from "./user";
import type { Issue } from "./issue";

/**
 * Class representing operations on custom fields used in issues.
 * The actual set of custom fields that are used for each issue is configured on a per-project basis.
 * @template F The type of issue fields.
 */

export type Fields<F extends IssueFields> = {
	/**
	 * Checks whether the value for a custom field is set to an expected value in the current transaction.
	 * @param field The field to check
	 * @param expected The expected value
	 * @returns If the field is set to the expected value, returns true
	 */
	becomes<K extends keyof F>(field: K, expected: F[K]): boolean;

	/**
	 * Checks whether a user has permission to read the custom field.
	 * @param field The custom field to check for read access
	 * @param user The user for whom the permission to read the custom field is checked
	 * @returns If the user can read the field, returns true
	 */
	canBeReadBy<K extends keyof F>(field: K, user: User): boolean;

	/**
	 * Checks whether a user has permission to update the custom field.
	 * @param field The custom field to check for update access
	 * @param user The user for whom the permission to update the custom field is checked
	 * @returns If the user can update the field, returns true
	 */
	canBeWrittenBy<K extends keyof F>(field: K, user: User): boolean;

	/**
	 * Checks whether the custom field is changed in the current transaction.
	 * @param field The name of the custom field (for example, 'State') or a reference to the field that is checked
	 * @returns If the value of the field is changed in the current transaction, returns true
	 */
	isChanged<K extends keyof F>(field: K): boolean;

	/**
	 * Returns the previous value of a single-valued custom field before an update was applied.
	 * If the field is not changed in the transaction, returns null.
	 * @param field The name of the custom field (for example, 'State') or a reference to the field for which the previous value is returned
	 * @returns If the custom field is changed in the current transaction, the previous value of the field. Otherwise, the current value of the field
	 */
	oldValue<K extends keyof F>(field: K): F[K] | null;

	/**
	 * Asserts that a value is set for a custom field.
	 * If a value for the required field is not set, the specified message is displayed in the user interface.
	 * @param fieldName The name of the custom field to check
	 * @param message The message that is displayed to the user that describes the field requirement
	 */
	required<K extends keyof F>(fieldName: K, message?: string): void;
} & F

/**
 * Represents a value that is stored in a custom field.
 * @template T The type of the value.
 * @extends BaseEntity
 */
export class Field<T extends string = string> extends BaseEntity {
	/** Date and time field type. Used when defining rule requirements */
	static readonly dateTimeType = FieldType.dateTimeType;

	/** Date field type. Used when defining rule requirements */
	static readonly dateType = FieldType.dateType;

	/** Float field type. Used when defining rule requirements */
	static readonly floatType = FieldType.floatType;

	/** Integer field type. Used when defining rule requirements */
	static readonly integerType = FieldType.integerType;

	/** Period field type. Used when defining rule requirements */
	static readonly periodType = FieldType.periodType;

	/** String field type. Used when defining rule requirements */
	static readonly stringType = FieldType.stringType;

	/** Text field type. Used when defining rule requirements */
	static readonly textType = FieldType.textType;

	/** The background color of the value in the custom field as it is displayed in YouTrack */
	readonly backgroundColor: string;

	/** The index value of the color that is assigned to the value in the custom field */
	readonly colorIndex: number;

	/** The description of the value as visible in the administrative UI for custom fields */
	readonly description: string;

	/** The foreground color of the value in the custom field as it is displayed in YouTrack */
	readonly foregroundColor: string;

	/** If the value is archived, this property is true */
	readonly isArchived: boolean;

	/** The name of the value, which is also stored as the value in the custom field */
	readonly name: T;

	/** The position of the value in the set of values for the custom field */
	readonly ordinal: number;

	/** String representation of the value */
	readonly presentation: string;

	// Add method to support direct assignment of enum values
	setValue(value: T): void;
}

/**
 * Represents a value in a custom field that stores a predefined set of values.
 * @extends Field
 * @template T The type of the value.
 */
export class EnumField<T extends string = string> extends Field<T> {
	/** Field type. Used when defining rule requirements */
	static readonly fieldType = FieldType.enumFieldType;

	/**
	 * Searches for EnumField entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
	 * @returns The set of EnumField entities that contain the specified extension properties.
	 */
	static findByExtensionProperties(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<EnumField>;
}

/**
 * Represents a value in a custom field that has a user associated with it.
 * @extends Field
 * @template T The type of the value.
 */
export class OwnedField<T extends string = string> extends Field {
	/** Field type. Used when defining rule requirements */
	static readonly fieldType = FieldType.ownedFieldType;

	/** The user who is associated with the value */
	readonly owner: User;

	/**
	 * Searches for OwnedField entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
	 * @returns The set of OwnedField entities that contain the specified extension properties.
	 */
	static findByExtensionProperties(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<OwnedField>;
}

/**
 * Represents a value in a custom field that stores a state type.
 * @extends Field
 * @template T The type of the value.
 */
export class State<T extends string = string> extends Field<T> {
	/** Field type. Used when defining rule requirements */
	static readonly fieldType = FieldType.stateFieldType;
	
	/** If issues in this state are considered to be resolved, this property is true */
	readonly isResolved: boolean;

	/**
	 * Searches for State entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
	 * @returns The set of State entities that contain the specified extension properties.
	 */
	static findByExtensionProperties(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<State>;
}

/**
 * Represents a value in a custom field that stores a version type.
 * @extends Field
 * @template T The type of the value.
 */
export class ProjectVersion<T extends string = string> extends Field<T> {
	/** Field type. Used when defining rule requirements */
	static readonly fieldType = FieldType.versionFieldType;

	/** If the version is released, this property is true */
	readonly isReleased: boolean;

	/** The release date that is associated with the version */
	readonly releaseDate: number;

	/** The start date that is associated with the version */
	readonly startDate: number;

	/**
	 * Searches for ProjectVersion entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
	 * @returns The set of ProjectVersion entities that contain the specified extension properties.
	 */
	static findByExtensionProperties(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<ProjectVersion>;
}

/**
 * Represents a value that is stored in a custom field that stores a build type.
 * @extends Field
 * @template T The type of the value.
 */
export class Build<T extends string = string> extends Field<T> {
	/** Field type. Used when defining rule requirements */
	static readonly fieldType = FieldType.buildFieldType;

	/** The date and time when the build was assembled */
	readonly assembleDate: number;

	/**
	 * Searches for Build entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
	 * @returns The set of Build entities that contain the specified extension properties.
	 */
	static findByExtensionProperties(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<Build>;
}

/**
 * Represents a custom field that is available in a project.
 */
export class ProjectCustomField extends BaseEntity {
	/** The localized name of the field */
	readonly localizedName: string;

	/** The name of the field */
	readonly name: string;

	/** The text that is displayed for this field when it is empty */
	readonly nullValueText: string;

	/** The data type assigned to values stored in the custom field */
	readonly typeName: string;

	/**
	 * Checks if the changes that are applied in the current transaction remove the condition to show the custom field.
	 * @param issue The issue for which the condition for showing the field is checked
	 * @returns When true, the condition for showing the field is removed in the current transaction
	 */
	becomesInvisibleInIssue(issue: Issue): boolean;

	/**
	 * Checks if the changes that are applied in the current transaction satisfy the condition to show the custom field.
	 * @param issue The issue for which the condition for showing the field is checked
	 * @returns When true, the condition for showing the field is met in the current transaction
	 */
	becomesVisibleInIssue(issue: Issue): boolean;

	/**
	 * Returns the background color that is used for this field value in the specified issue.
	 * @param issue The issue for which the background color is returned
	 * @returns The background color that is used for this field value in the specified issue
	 */
	getBackgroundColor(issue: Issue): string | null;

	/**
	 * Returns the foreground color that is used for this field value in the specified issue.
	 * @param issue The issue for which the foreground color is returned
	 * @returns The foreground color that is used for this field value in the specified issue
	 */
	getForegroundColor(issue: Issue): string | null;

	/**
	 * Returns the string presentation of the value that is stored in this field in the specified issue.
	 * @param issue The issue for which the value presentation is returned
	 * @returns The string presentation of the value
	 */
	getValuePresentation(issue: Issue): string;

	/**
	 * Checks if a field is visible in the issue.
	 * @param issue The issue for which the condition for showing the field is checked
	 * @returns When true, the condition for showing the custom field in the issue has been met
	 */
	isVisibleInIssue(issue: Issue): boolean;
}

/**
 * Base class for custom fields that store simple values like strings and numbers.
 * @extends ProjectCustomField
 * @template T The type of the value.
 */
export class SimpleProjectCustomField extends ProjectCustomField {
	/**
	 * Searches for SimpleProjectCustomField entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
	 * @returns The set of SimpleProjectCustomField entities that contain the specified extension properties.
	 */
	static findByExtensionProperties(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<SimpleProjectCustomField>;
}

/**
 * Represents a custom field in a project that stores values as a user type.
 * @extends ProjectCustomField
 * @template T The type of the value.
 */
export class UserProjectCustomField extends ProjectCustomField {
	/** The default value for the custom field */
	readonly defaultUsers: YTSet<User>;

	/** The list of available values for the custom field */
	readonly values: YTSet<User>;
}

/**
 * Represents a custom field that stores a string of characters as text.
 * When displayed in an issue, the text is shown as formatted in Markdown.
 * @extends SimpleProjectCustomField
 * @template T The type of the value.
 */
export class TextProjectCustomField extends SimpleProjectCustomField {
	/**
	 * Searches for TextProjectCustomField entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
	 * @returns The set of TextProjectCustomField entities that contain the specified extension properties.
	 */
	static findByExtensionProperties(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<TextProjectCustomField>;
}

/**
 * Represents a custom field in a project that stores a value as a period type.
 * Uses org.joda.time.Period as a base class for period values.
 * @extends SimpleProjectCustomField
 * @template T The type of the value.
 */
export class PeriodProjectCustomField extends SimpleProjectCustomField {
	/**
	 * Searches for PeriodProjectCustomField entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
	 * @returns The set of PeriodProjectCustomField entities that contain the specified extension properties.
	 */
	static findByExtensionProperties(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<PeriodProjectCustomField>;
}

/**
 * Represents a custom field in a project that stores a UserGroup type.
 * @extends ProjectCustomField
 * @template T The type of the value.
 */
export class GroupProjectCustomField extends ProjectCustomField {
	/** The list of available values for the custom field */
	readonly values: YTSet<UserGroup>;

	/**
	 * Searches for GroupProjectCustomField entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
	 * @returns The set of GroupProjectCustomField entities that contain the specified extension properties.
	 */
	static findByExtensionProperties(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<GroupProjectCustomField>;

	/**
	 * Returns the value that matches the specified name in a custom field that stores values as a user group.
	 * @param name The name of the group to search for in the set of values for the custom field
	 * @returns The group with the specified name. This group can be set as the value for a field that stores a user group
	 */
	findValueByName(name: string): UserGroup;
}

/**
 * Represents a custom field in a project that stores a predefined set of values.
 * @extends ProjectCustomField
 * @template T The type of the value.
 */
export class BundleProjectCustomField extends ProjectCustomField {
	/** The values that are used as the default for this field */
	readonly defaultValues: YTSet<Field>;

	/** The list of available values for the custom field */
	readonly values: YTSet<Field>;

	/**
	 * Searches for BundleProjectCustomField entities with extension properties that match the specified query.
	 * @param extensionPropertiesQuery Key-value pairs representing properties and their values.
	 * @returns The set of BundleProjectCustomField entities that contain the specified extension properties.
	 */
	static findByExtensionProperties(
		extensionPropertiesQuery: Record<string, unknown>,
	): YTSet<BundleProjectCustomField>;

	/**
	 * Adds a value to the set of values for the custom field.
	 * If a value with the specified name already exists in the set, an exception is thrown.
	 * @param name The name of the value that you want to add to the set
	 * @returns The value that was added to the set
	 */
	createValue(name: string): Field;

	/**
	 * Returns a value with the specified name in the set of values for a custom field.
	 * @param name The name of the field value to search for
	 * @returns The value with the specified name in the set of values for the custom field
	 */
	findValueByName(name: string): Field;

	/**
	 * Returns a value that is assigned a specified position in the set of values for a custom field.
	 * @param ordinal The position of the field value to search by
	 * @returns The value that is assigned the specified position in the set of values for the custom field
	 */
	findValueByOrdinal(ordinal: number): Field;

	/**
	 * Checks if value is permitted in the issue.
	 * @param issue The issue for which the value is checked
	 * @param value The value to check
	 * @returns When true it means the value can be used
	 */
	isValuePermittedInIssue(issue: Issue, value: Field): boolean;
}
