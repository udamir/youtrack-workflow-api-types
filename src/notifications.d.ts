/**
 * Type definitions for @jetbrains/youtrack-scripting-api/notifications
 * Based on documentation: https://www.jetbrains.com/help/youtrack/devportal/YouTrack-Api-Documentation.html
 */
import type { Issue } from './entities/issue';

/**
 * This module contains functionality for sending email messages.
 * These messages are independent from the notification scheme that is used for subscriptions to issue updates in YouTrack.
 * All of the components for these email messages are defined in the parameters for the function that is supported in this module.
 * However, the messages are still sent by the SMTP server that is connected to your YouTrack installation.
 */
export namespace notifications {
  /**
   * Email message structure for sendEmail function
   */
  export interface EmailMessage {
    /**
     * The visible name of the sender. When used, the specified value is displayed as the sender name in the email message.
     * If the sender email (whether taken from the project settings or the server setting) includes a sender name,
     * it is overwritten with this value. If this parameter is left empty, the presentation of the sender is
     * determined by the 'From' address that is saved in either the project or server settings.
     */
    fromName?: string;
    
    /**
     * A list of recipient email addresses.
     */
    to: string[];
    
    /**
     * An optional list of email copy recipient addresses.
     */
    cc?: string[];
    
    /**
     * An optional list of blind carbon copy recipient addresses.
     */
    bcc?: string[];
    
    /**
     * The email message subject.
     */
    subject: string;
    
    /**
     * The email message body.
     */
    body: string;
    
    /**
     * An optional key-value map with custom email headers.
     * Some headers, like 'Reply-To' may be overridden with project settings.
     */
    headers?: Record<string, string>;
  }
  
  /**
   * Sends an email message to one or more email addresses.
   * If the project that the issue belongs to uses a dedicated project 'From' email,
   * the email is sent from this address. Otherwise, the default server 'From' address is taken.
   * 
   * @param message An object that contains all of the message components that are required for sendout.
   * @param issue The issue that the email message is related to. All email messages that are related to a single issue are combined into one thread.
   */
  export function sendEmail(message: EmailMessage, issue?: Issue): void;
}
