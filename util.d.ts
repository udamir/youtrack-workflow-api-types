
import type { BaseEntity } from './entities/core';
import type { Issue } from './entities/issue';
import type { User } from './entities/user';

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
 * Base context interface for rule functions
 */
export interface RuleContext {
  /** The current issue being processed */
  issue: Issue;
  /** The current user executing the rule */
  currentUser: User;
  /** Additional properties defined in Requirements */
  [key: string]: Issue | User | BaseEntity | boolean | string | number | undefined;
}

/**
 * Context for action functions
 */
export interface ActionContext extends RuleContext {
  /** When true, the rule is triggered in reaction to a command that is applied without notification */
  isSilentOperation?: boolean;
}

/**
 * This function is called by different events depending on the rule type: when a change is applied to an issue (on-change rules),
 * when a command is executed (action rules), or according to a predefined schedule (scheduled rules).
 * This function is called separately for each related issue.
 * @param ctx The execution context. Along with the parameters listed below, the context also contains objects that you describe in the Requirements.
 */
export type actionFunction = (ctx: ActionContext) => void;

/**
 * This function is called to determine whether an action function can be applied to an issue.
 * Guard functions are used in on-change rules, action rules, and in transitions between values of a state-machine rule.
 * On-schedule rules also support guard functions, but this rule type includes a `search` property that has a similar purpose.
 * @param ctx The execution context. Along with the parameters listed below, the context also contains objects that you describe as Requirements.
 */
export type guardFunction = (ctx: RuleContext) => boolean;

/**
 * Context interface for SLA breach functions
 */
export interface SLABreachContext extends RuleContext {
  /** The timer custom field where the time goal has been breached for this ticket */
  breachedField: string;
}

/**
 * This function is called when the SLA policy needs to update a ticket.
 * For example, it can pause the timers according to the SLA pausing settings,
 * or it can resume the timers when there is a new comment from the customer.
 * Only SLA policy scripts use this function.
 * @param ctx The execution context. Along with the parameters listed below, the context also contains objects that you describe as Requirements.
 */
export type slaActionFunction = (ctx: RuleContext) => void;

/**
 * This function is called when one of the SLA goals is breached.
 * Only SLA policy scripts use this function.
 * @param ctx The execution context. Along with the parameters listed below, the context also contains objects that you describe as Requirements.
 */
export type slaBreachFunction = (ctx: SLABreachContext) => void;

/**
 * This function is called when the SLA policy starts applying to the ticket.
 * For example, it initialises the timers according to the SLA settings.
 * Only SLA policy scripts use this function.
 * @param ctx The execution context. Along with the parameters listed below, the context also contains objects that you describe as Requirements.
 */
export type slaEnterFunction = (ctx: RuleContext) => void;

/**
 * This function is called to determine whether the SLA policy can be applied to a ticket.
 * Only SLA policy scripts use this function.
 * @param ctx The execution context. Along with the parameters listed below, the context also contains objects that you describe as Requirements.
 */
export type slaGuardFunction = (ctx: RuleContext) => boolean;
