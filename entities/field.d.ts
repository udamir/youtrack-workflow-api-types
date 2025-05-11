/**
 * @file Field type definitions for YouTrack API
 * @description Represents field and custom field entities in YouTrack
 */

import type { BaseEntity, YTSet } from "./core";
import type { User, UserGroup } from "./user";
import type { Project } from "./project";
import type { Issue } from "./issue";

/**
 * Represents a custom field that is available in a project.
 * @extends BaseEntity
 * @since 2018.1
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
	 * Checks whether a field is set to an expected value in the current transaction.
	 * @param fieldName The name of the field to check
	 * @param expected The expected value
	 * @returns If the field is set to the expected value, returns true
	 */
	becomes(fieldName: string, expected: string): boolean;

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
	 * Checks whether a user has permission to read the field.
	 * @param fieldName The name of the field
	 * @param user The user for whom the permission to read the field is checked
	 * @returns If the user can read the field, returns true
	 */
	canBeReadBy(fieldName: string, user: User): boolean;

	/**
	 * Checks whether a user has permission to update the field.
	 * @param fieldName The name of the field
	 * @param user The user for whom the permission to update the field is checked
	 * @returns If the user can update the field, returns true
	 */
	canBeWrittenBy(fieldName: string, user: User): boolean;

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
	 * Checks whether a field is equal to an expected value.
	 * @param fieldName The name of the field to check
	 * @param expected The expected value
	 * @returns If the field is equal to the expected value, returns true
	 */
	is(fieldName: string, expected: string): boolean;

	/**
	 * Checks whether the value of a field is changed in the current transaction.
	 * @param fieldName The name of the field to check
	 * @returns If the value of the field is changed in the current transaction, returns true
	 */
	isChanged(fieldName: string): boolean;

	/**
	 * Checks if a field is visible in the issue.
	 * @param issue The issue for which the condition for showing the field is checked
	 * @returns When true, the condition for showing the custom field in the issue has been met
	 */
	isVisibleInIssue(issue: Issue): boolean;

	/**
	 * Returns the previous value of a single-value field before an update was applied.
	 * @param fieldName The name of the field
	 * @returns If the field is changed in the current transaction, the previous value of the field. Otherwise, null
	 */
	oldValue(
		fieldName: string,
	): string | number | boolean | BaseEntity | User | Date | null;

	/**
	 * Asserts that a value is set for a field.
	 * @param fieldName The name of the field to check
	 * @param message The message that is displayed to the user that describes the field requirement
	 */
	required(fieldName: string, message?: string): void;

	/**
	 * Checks whether a field was equal to an expected value prior to the current transaction.
	 * @param fieldName The name of the field to check
	 * @param expected The expected value
	 * @returns If the field was equal to the expected value, returns true
	 */
	was(fieldName: string, expected: string): boolean;
}

/**
 * Class representing operations on custom fields used in issues.
 * The actual set of custom fields that are used for each issue is configured on a per-project basis.
 * @since 2018.1
 */

export class Fields {
	/**
	 * Checks whether the value for a custom field is set to an expected value in the current transaction.
	 * @param field The field to check
	 * @param expected The expected value
	 * @returns If the field is set to the expected value, returns true
	 */
	static becomes(
		field: string | ProjectCustomField,
		expected: unknown,
	): boolean;

	/**
	 * Checks whether a user has permission to read the custom field.
	 * @param field The custom field to check for read access
	 * @param user The user for whom the permission to read the custom field is checked
	 * @returns If the user can read the field, returns true
	 */
	static canBeReadBy(field: string | ProjectCustomField, user: User): boolean;

	/**
	 * Checks whether a user has permission to update the custom field.
	 * @param field The custom field to check for update access
	 * @param user The user for whom the permission to update the custom field is checked
	 * @returns If the user can update the field, returns true
	 */
	static canBeWrittenBy(
		field: string | ProjectCustomField,
		user: User,
	): boolean;

	/**
	 * Checks whether the custom field is changed in the current transaction.
	 * @param field The name of the custom field (for example, 'State') or a reference to the field that is checked
	 * @returns If the value of the field is changed in the current transaction, returns true
	 */
	static isChanged(field: string | ProjectCustomField): boolean;

	/**
	 * Returns the previous value of a single-valued custom field before an update was applied.
	 * If the field is not changed in the transaction, returns null.
	 * @param field The name of the custom field (for example, 'State') or a reference to the field for which the previous value is returned
	 * @returns If the custom field is changed in the current transaction, the previous value of the field. Otherwise, the current value of the field
	 */
	static oldValue(field: string | ProjectCustomField): unknown;

	/**
	 * Asserts that a value is set for a custom field.
	 * If a value for the required field is not set, the specified message is displayed in the user interface.
	 * @param fieldName The name of the custom field to check
	 * @param message The message that is displayed to the user that describes the field requirement
	 */
	static required(fieldName: string, message?: string): void;

	/**
	 * Returns the value of a custom field.
	 */
	[key: string]:
		| Field
		| string
		| number
		| boolean
		| User
		| Project
		| Date
		| null
		| undefined;
}

/**
 * Represents a value that is stored in a custom field.
 * @extends BaseEntity
 * @since 2018.1
 */
export class Field extends BaseEntity {
	/** Date and time field type. Used when defining rule requirements */
	static readonly dateTimeType: string;

	/** Date field type. Used when defining rule requirements */
	static readonly dateType: string;

	/** Float field type. Used when defining rule requirements */
	static readonly floatType: string;

	/** Integer field type. Used when defining rule requirements */
	static readonly integerType: string;

	/** Period field type. Used when defining rule requirements */
	static readonly periodType: string;

	/** String field type. Used when defining rule requirements */
	static readonly stringType: string;

	/** Text field type. Used when defining rule requirements */
	static readonly textType: string;

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
	readonly name: string;

	/** The position of the value in the set of values for the custom field */
	readonly ordinal: number;

	/** String representation of the value */
	readonly presentation: string;
}

/**
 * Represents a value in a custom field that stores a predefined set of values.
 * @extends Field
 * @since 2018.1
 */
export class EnumField extends Field {
	/** Field type. Used when defining rule requirements */
	static readonly fieldType: string;

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
 * @since 2018.1
 */
export class OwnedField extends Field {
	/** Field type. Used when defining rule requirements */
	static readonly fieldType: string;

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
 * @since 2018.1
 */
export class State extends Field {
	/** Field type. Used when defining rule requirements */
	static readonly fieldType: string;

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
 * @since 2018.1
 */
export class ProjectVersion extends Field {
	/** Field type. Used when defining rule requirements */
	static readonly fieldType: string;

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
 * @since 2018.1
 */
export class Build extends Field {
	/** Field type. Used when defining rule requirements */
	static readonly fieldType: string;

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
 * Base class for custom fields that store simple values like strings and numbers.
 * @extends ProjectCustomField
 * @since 2018.1
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
 * @since 2018.1
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
 * @since 2018.1
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
 * @since 2018.1
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
 * @since 2018.1
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
 * @since 2018.1
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
