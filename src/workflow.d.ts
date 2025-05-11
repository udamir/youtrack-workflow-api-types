/**
 * Type definitions for @jetbrains/youtrack-scripting-api/workflow
 * Based on documentation: https://www.jetbrains.com/help/youtrack/devportal/YouTrack-Api-Documentation.html
 */

export namespace workflow {

  /**
   * Checks to determine whether the specified condition is true.
   * If the condition is not true, the system throws an error. All changes are rolled back to the initial state.
   * The error contains the specified message, which is displayed in the user interface.
   * @param condition The condition to check
   * @param message The error message that is shown to the user in cases where the condition is false
   * @param parameters Parameters for the message
   */
  export function check(condition: boolean, message: string, parameters?: string): void;

  /**
   * Returns a localized version of a message.
   * WARNING: for internal use only! This method is only supported in default workflows where
   * the IDs and text strings for localized messages are stored in the application.
   * References to this method in custom workflows are not supported.
   * @param messageId The message ID
   * @returns An object that contains the placeholders and localized strings associated with the specified message
   */
  export function i18n(messageId: string): { toString(): string };

  /**
   * Displays the specified message in the YouTrack user interface.
   * @param messageText The message text
   */
  export function message(messageText: string): void;
}
