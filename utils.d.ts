import type {
	Build,
	BundleProjectCustomField,
	EnumField,
	Fields,
	GroupProjectCustomField,
	OwnedField,
	PeriodProjectCustomField,
	ProjectCustomField,
	ProjectVersion,
	State,
	TextProjectCustomField,
	UserProjectCustomField,
} from "./entities/field";
import type { Requirement, Requirements } from "./entities";
import type { Issue, User, Tag, UserGroup, Project } from "./entities";

export enum FieldType {
	dateTimeType = "dateTimeType",
	dateType = "dateType",
	integerType = "integerType",
	floatType = "floatType",
	periodType = "periodType",
	stringType = "stringType",
	textType = "textType",
	enumFieldType = "enumFieldType",
	stateFieldType = "stateFieldType",
	versionFieldType = "versionFieldType",
	buildFieldType = "buildFieldType",
	userFieldType = "userFieldType",
  ownedFieldType = "ownedFieldType",
}

/**
 * Available types for user input in action rules
 * @description Represents the object types that can be requested from the user in an action rule
 */
export type ActionUserInputType =
	| FieldType.dateTimeType
	| FieldType.dateType
	| FieldType.integerType
	| FieldType.floatType
	| FieldType.periodType
	| FieldType.stringType
	| Build
	| EnumField
	| Issue
	| Tag
	| OwnedField
	| Project
	| ProjectVersion
	| User
	| UserGroup;

/**
 * Represents an input stream for reading data
 */
export interface InputStream {
	/**
	 * Reads data from the input stream
	 * @returns The data read from the stream
	 */
	read(): Uint8Array;

	/**
	 * Closes this input stream and releases any system resources associated with the stream.
	 */
	close(): void;
}

/**
 * Helper type to get the field name from a requirement
 * Uses the name property if specified, otherwise falls back to key
 */
export type FieldNameFromRequirement<
	K extends string,
	R extends Requirement,
> = R["name"] extends string ? R["name"] : K;

/**
 * Transforms a requirement into its corresponding entity type
 */
export type ProjectCustomFieldFromRequirement<R extends Requirement> =
	R["type"] extends FieldType.stringType ? ProjectCustomField
		: R["type"] extends FieldType.textType ? TextProjectCustomField
			: R["type"] extends FieldType.periodType ? PeriodProjectCustomField
				: R["type"] extends FieldType.integerType ? ProjectCustomField
					: R["type"] extends FieldType.floatType ? ProjectCustomField
						: R["type"] extends FieldType.dateType ? PeriodProjectCustomField
							: R["type"] extends FieldType.dateTimeType ? PeriodProjectCustomField
								: R["type"] extends FieldType.enumFieldType ? BundleProjectCustomField
									: R["type"] extends typeof EnumField ? BundleProjectCustomField
										: R["type"] extends FieldType.userFieldType ? UserProjectCustomField
											: R["type"] extends typeof OwnedField ? UserProjectCustomField
												: R["type"] extends typeof State ? BundleProjectCustomField
													: R["type"] extends typeof ProjectVersion ? BundleProjectCustomField
														: R["type"] extends typeof Build ? BundleProjectCustomField
															: R["type"] extends typeof UserGroup ? GroupProjectCustomField
																: R["type"] extends typeof Project ? Project
																	: R["type"] extends typeof Issue ? Issue
																		: R["type"] extends typeof User ? User
																			: R["type"] extends typeof Tag ? Tag
																				: never;
/**
 * Transforms requirements into their corresponding entity types
 * This provides access to the actual entity objects (Field, Project, User, etc.)
 */
export type ProjectCustomFieldsFromRequirements<
	R extends Record<string, Requirement>,
> = {
	[K in keyof R as FieldNameFromRequirement<
		K & string,
		R[K]
	>]: ProjectCustomFieldFromRequirement<R[K]>;
};

/**
 * Maps ActionUserInputType to its corresponding runtime value type
 * This type ensures that userInput values in ActionContext have the correct type
 * based on what was defined in the action rule properties
 */
export type FieldFromRequirement<T extends ActionUserInputType> = T extends
	| FieldType.dateTimeType | FieldType.dateType ? Date
	: T extends FieldType.integerType | FieldType.floatType | FieldType.periodType ? number
		: T extends FieldType.stringType ? string
			: T extends EnumField ? string
				: T extends Build ? Build
					: T extends Issue ? Issue
						: T extends Tag ? Tag
							: T extends OwnedField ? OwnedField
								: T extends Project ? Project
									: T extends ProjectVersion ? ProjectVersion
										: T extends User ? User
											: T extends UserGroup ? UserGroup
												: never;


  type FieldTypeString =
  | FieldType.stringType
  | FieldType.textType
  | FieldType.floatType
  | FieldType.integerType
  | FieldType.dateType
  | FieldType.dateTimeType
  | FieldType.periodType
  | FieldType.enumFieldType
  | FieldType.userFieldType
  | FieldType.stateFieldType
  | FieldType.versionFieldType
  | FieldType.buildFieldType;

type FieldTypeMap = {
  [FieldType.stringType]: string;
  [FieldType.textType]: string;
  [FieldType.floatType]: number;
  [FieldType.integerType]: number;
  [FieldType.dateType]: Date;
  [FieldType.dateTimeType]: Date;
  [FieldType.periodType]: string;
  [FieldType.userFieldType]: User;
  [FieldType.stateFieldType]: State;
  [FieldType.versionFieldType]: ProjectVersion;
  [FieldType.buildFieldType]: Build;
};

type IsValidFieldType<T> =
  T extends FieldTypeString ? true :
  T extends { fieldType: FieldTypeString } ? true :
  false;

type ExtractEnumValue<K extends string, V> =
  V extends { name: infer N extends string } ? N : K;

type ExtractEnumValues<T extends Requirement> = {
  [K in keyof T]:
    K extends "type" | "name" ? never :
    ExtractEnumValue<K & string, T[K]>
}[keyof T & string];

type FieldValue<RVal extends Requirement> =
  RVal["type"] extends typeof EnumField.fieldType
    ? EnumField<ExtractEnumValues<RVal>>
    : RVal["type"] extends keyof FieldTypeMap
      ? FieldTypeMap[RVal["type"]]
      : RVal["type"] extends { fieldType: infer FT extends FieldTypeString }
        ? FT extends keyof FieldTypeMap
          ? FieldTypeMap[FT]
          : never
        : never;

type FieldName<RKey extends string, RVal extends Requirement> =
  RVal["name"] extends string ? RVal["name"] : RKey;


/**
 * Extracts field names and their values from requirements
 */
type ExtractFieldsFromRequirements<R extends Record<string, Requirement>> = {
  [K in keyof R as IsValidFieldType<R[K]["type"]> extends true
    ? FieldName<K & string, R[K]>
    : never
  ]: FieldValue<R[K]>
};

/**
 * Creates a strongly-typed Fields object from requirements definition
 * Includes both the fields and the field methods (isChanged, required, etc.)
 */
export type FieldsFromRequirements<R extends Record<string, Requirement>> = 
  Fields<ExtractFieldsFromRequirements<R>>;            
                    
/**
 * Base context interface for rule functions
 *
 * Includes:
 * - issue: The issue being processed with fields from requirements
 * - currentUser: The user running the rule
 * - Project custom fields (accessed by their name from requirements)
 */
export type RuleContext<R extends Requirements> =
	ProjectCustomFieldsFromRequirements<R> & {
		/** The current issue being processed */
		issue: Issue<FieldsFromRequirements<R>>;
		/** The current user executing the rule */
		currentUser: User;
	};

/**
 * Context for action functions
 */
export type ActionContext<
	R extends Requirements,
	T extends ActionUserInputType,
> = RuleContext<R> & {
	/** When true, the rule is triggered in reaction to a command that is applied without notification */
	isSilentOperation?: boolean;

	userInput?: FieldFromRequirement<T>;
};

/**
 * This function is called by different events depending on the rule type: when a change is applied to an issue (on-change rules),
 * when a command is executed (action rules), or according to a predefined schedule (scheduled rules).
 * This function is called separately for each related issue.
 * @param ctx The execution context. Along with the parameters listed below, the context also contains objects that you describe in the Requirements.
 */
export type actionFunction = <
	R extends Requirements,
	T extends ActionUserInputType,
>(
	ctx: ActionContext<R, T>,
) => void;

/**
 * This function is called to determine whether an action function can be applied to an issue.
 * Guard functions are used in on-change rules, action rules, and in transitions between values of a state-machine rule.
 * On-schedule rules also support guard functions, but this rule type includes a `search` property that has a similar purpose.
 * @param ctx The execution context. Along with the parameters listed below, the context also contains objects that you describe as Requirements.
 */
export type guardFunction = <
	R extends Requirements,
	T extends ActionUserInputType,
>(
	ctx: ActionContext<R, T>,
) => boolean;

/**
 * Context interface for SLA breach functions
 */
export type SLABreachContext<R extends Requirements> = RuleContext<R> & {
	/** The timer custom field where the time goal has been breached for this ticket */
	breachedField: string;
};

/**
 * This function is called when the SLA policy needs to update a ticket.
 * For example, it can pause the timers according to the SLA pausing settings,
 * or it can resume the timers when there is a new comment from the customer.
 * Only SLA policy scripts use this function.
 * @param ctx The execution context. Along with the parameters listed below, the context also contains objects that you describe as Requirements.
 */
export type slaActionFunction = <
	R extends Requirements,
	T extends ActionUserInputType,
>(
	ctx: ActionContext<R, T>,
) => void;

/**
 * This function is called when one of the SLA goals is breached.
 * Only SLA policy scripts use this function.
 * @param ctx The execution context. Along with the parameters listed below, the context also contains objects that you describe as Requirements.
 */
export type slaBreachFunction = <R extends Requirements>(
	ctx: SLABreachContext<R>,
) => void;

/**
 * This function is called when the SLA policy starts applying to the ticket.
 * For example, it initialises the timers according to the SLA settings.
 * Only SLA policy scripts use this function.
 * @param ctx The execution context. Along with the parameters listed below, the context also contains objects that you describe as Requirements.
 */
export type slaEnterFunction = <R extends Requirements>(
	ctx: RuleContext<R>,
) => void;

/**
 * This function is called to determine whether the SLA policy can be applied to a ticket.
 * Only SLA policy scripts use this function.
 * @param ctx The execution context. Along with the parameters listed below, the context also contains objects that you describe as Requirements.
 */
export type slaGuardFunction = <R extends Requirements>(
	ctx: RuleContext<R>,
) => boolean;
