/**
 * @file Article type definitions for YouTrack API
 * @description Represents article entities in YouTrack
 */

import type { InputStream, ActionUserInputType, Requirements, FieldFromRequirement } from '../utils';
import type { BaseEntity, YTSet, PersistentFile } from './core';
import type { Project } from './project';
import type { User } from './user';
import type { Tag } from './tag';

/**
 * The base class for article attachment.
 * @extends PersistentFile
 */
export class BaseArticleAttachment extends PersistentFile {
  /**
   * The user who created the attachment.
   */
  readonly author: User;
  
  /**
   * The date when the attachment was created.
   */
  readonly created: number;
}

/**
 * The base class for article comment.
 * @since 2021.4.23500
 */
export class BaseArticleComment extends BaseEntity {
  /**
   * The set of attachments that are attached to the comment.
   */
  readonly attachments: YTSet<BaseArticleAttachment>;
  
  /**
   * The user who created the comment.
   */
  readonly author: User;
  
  /**
   * Time the comment was created.
   */
  readonly created: number;
  
  /**
   * When `true`, the comment is pinned in the article. Otherwise, `false`.
   * @since 2024.1
   */
  readonly isPinned: boolean;
  
  /**
   * The text of the comment.
   */
  text: string;
  
  /**
   * Time the comment was last updated.
   */
  readonly updated: number;
}

/**
 * Represents a comment that is added to an article.
 * @extends BaseArticleComment
 * @since 2021.4.23500
 */
export class ArticleComment extends BaseArticleComment {
  /**
   * The article the comment belongs to.
   */
  readonly article: Article;
  
  /**
   * Creates a declaration of a rule that a user can apply to an article comment using a menu option.
   * The object that is returned by this method is normally exported to the `rule` property, otherwise it is not treated as a rule.
   * 
   * @param ruleProperties - A JSON object that defines the properties for the rule.
   * @param ruleProperties.title - The human-readable name of the rule. Displayed in the administrative UI in YouTrack.
   * @param ruleProperties.userInput - An object that defines the properties for information that will be requested from the user who triggers the action rule.
   * @param ruleProperties.userInput.type - The data type for the value that is requested from the user.
   * @param ruleProperties.userInput.description - The label for the control that is used to collect additional information from the user.
   * @param ruleProperties.guard - A function that is invoked to determine whether the action is applicable to an article comment.
   * @param ruleProperties.action - The function that is invoked when a user triggers this action.
   * @param ruleProperties.requirements - The set of entities that must be present for the script to work as expected.
   * @returns The object representation of the rule.
   * 
   * @example
   * ```
   * var entities = require('@jetbrains/youtrack-scripting-api/entities');
   * exports.rule = entities.ArticleComment.action({
   *   title: 'Log comment text if comment has attachments',
   *   guard: function(ctx) {
   *     return !ctx.articleComment.attachments.isEmpty();
   *   },
   *   action: function(ctx) {
   *     console.log(ctx.articleComment.text);
   *   }
   * });
   * ```
   */
  static action(ruleProperties: {
    title: string;
    userInput?: {
      type: string | Record<string, unknown>;
      description: string;
    };
    guard(ctx: { articleComment: ArticleComment }): boolean;
    action(ctx: { articleComment: ArticleComment }): void;
    requirements?: Record<string, unknown>;
  }): object;
  
  /**
   * Searches for ArticleComment entities with extension properties that match the specified query.
   * 
   * @param extensionPropertiesQuery - The extension properties query, defined as a set of key-value pairs.
   * @returns The set of ArticleComment entities that contain the specified extension properties.
   * @since 2024.3.43260
   * 
   * @example
   * ```
   * {
   *   property1: "value1",
   *   property2: "value2"
   * }
   * ```
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<ArticleComment>;
}

/**
 * Represents a file that is attached to an article.
 * @extends BaseArticleAttachment
 */
export class ArticleAttachment extends BaseArticleAttachment {
  /**
   * The article to which the attachment belongs.
   */
  readonly article: Article;
  
  /**
   * Creates a declaration of a rule that a user can apply to an article attachment using a menu option.
   * The object that is returned by this method is normally exported to the `rule` property, otherwise it is not treated as a rule.
   * 
   * @param ruleProperties - A JSON object that defines the properties for the rule.
   * @param ruleProperties.title - The human-readable name of the rule. Displayed in the administrative UI in YouTrack.
   * @param ruleProperties.userInput - An object that defines the properties for information that will be requested from the user who triggers the action rule.
   * @param ruleProperties.userInput.type - The data type for the value that is requested from the user.
   * @param ruleProperties.userInput.description - The label for the control that is used to collect additional information from the user.
   * @param ruleProperties.guard - A function that is invoked to determine whether the action is applicable to an article attachment.
   * @param ruleProperties.action - The function that is invoked when a user triggers this action.
   * @param ruleProperties.requirements - The set of entities that must be present for the script to work as expected.
   * @returns The object representation of the rule.
   * 
   * @example
   * ```
   * var entities = require('@jetbrains/youtrack-scripting-api/entities');
   * exports.rule = entities.ArticleAttachment.action({
   *   title: 'Log attachment name',
   *   guard: function(ctx) {
   *     return !ctx.articleAttachment.article.comments.isEmpty();
   *   },
   *   action: function(ctx) {
   *     console.log(ctx.articleAttachment.name);
   *   }
   * });
   * ```
   */
  static action<R extends Requirements, T extends ActionUserInputType>(ruleProperties: {
    title: string;
    command: string;
    userInput?: {
      type: T;
      description?: string;
    } | null;
    guard(ctx: { articleAttachment: ArticleAttachment, userInput?: FieldFromRequirement<T> }): boolean;
    action(ctx: { articleAttachment: ArticleAttachment, userInput?: FieldFromRequirement<T> }): void;
    requirements?: R;
  }): object;
  
  /**
   * Searches for ArticleAttachment entities with extension properties that match the specified query.
   * 
   * @param extensionPropertiesQuery - The extension properties query, defined as a set of key-value pairs.
   * @returns The set of ArticleAttachment entities that contain the specified extension properties.
   * @since 2024.3.43260
   * 
   * @example
   * ```
   * {
   *   property1: "value1",
   *   property2: "value2"
   * }
   * ```
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<ArticleAttachment>;
}

interface ArticleDraft extends Article {
  readonly isDraft: boolean;
}

/**
 * Context provided to article rule handlers
 */
interface ArticleContext {
  /** Current article */
  article: Article;
  /** Previous article state (before changes) */
  beforeArticle?: Article;
  /** Article fields that have been changed */
  changed?: Record<string, unknown>;
  /** The workflow context */
  workflowContext?: object;
  /** The project containing the article */
  project?: Project;
  /** Current user executing the action */
  currentUser?: User;
}

/**
 * The base class for article.
 * @since 2021.4.23500
 */
export class BaseArticle extends BaseEntity {
  /**
   * The set of attachments that are attached to the article.
   */
  readonly attachments: YTSet<BaseArticleAttachment>;
  
  /**
   * The user who created the article.
   */
  readonly author: User;
  
  /**
   * The text that is entered as the article content.
   */
  content: string;
  
  /**
   * If the current user has added the 'Star' tag to watch the article, this property is `true`.
   * @since 2023.1
   */
  readonly isStarred: boolean;
  
  /**
   * The article title.
   */
  readonly summary: string;
  
  /**
   * The list of tags that are attached to the article.
   * @since 2023.1
   */
  readonly tags: YTSet<Tag>;
  
  /**
   * Adds a tag with the specified name to an article.
   * YouTrack adds the first matching tag that is visible to the current user.
   * If a match is not found, a new private tag is created for the current user.
   * @param name The name of the tag to add to the article.
   * @returns The tag that has been added to the article.
   * @since 2023.1
   * @example
   * ```
   * article.addTag('review');
   * ```
   */
  addTag(name: string): Tag;
  
  /**
   * Checks whether the specified tag is attached to the article.
   * @param tagName The name of the tag to check for the article.
   * @returns If the specified tag is attached to the article, returns `true`.
   * @since 2023.1
   */
  hasTag(tagName: string): boolean;
  
  /**
   * Removes a tag with the specified name from an article.
   * If the specified tag is not attached to the article, nothing happens.
   * This method first searches through tags owned by the current user,
   * then through all other visible tags.
   * @param name The name of the tag to remove from the article.
   * @returns The tag that has been removed from the article.
   * @since 2023.1
   * @example
   * ```
   * article.removeTag('waiting for review');
   * ```
   */
  removeTag(name: string): Tag;
}

/**
 * Represents an article in YouTrack.
 * @since 2021.4.23500
 */
export class Article extends BaseArticle {
  /**
   * The set of sub-articles of the current one.
   * @since 2024.4
   */
  readonly childArticles: YTSet<Article>;
  
  /**
   * A list of comments for the article.
   */
  readonly comments: YTSet<ArticleComment>;
  
  /**
   * The date when the article was created.
   */
  readonly created: number;
  
  /**
   * The set of comments that are edited in the current transaction.
   * Comments that are added and removed are not considered to be edited.
   * Instead, these are represented by the `article.comments.added` and
   * `article.comments.removed` properties.
   */
  readonly editedComments: YTSet<ArticleComment>;
  
  /**
   * The article number in the project.
   */
  readonly numberInProject: number;
  
  /**
   * The parent article of the current one.
   * @since 2024.4
   */
  readonly parentArticle: Article;
  
  /**
   * The set of comments that are pinned in the article.
   * @since 2024.1
   */
  readonly pinnedComments: YTSet<ArticleComment>;
  
  /**
   * The project to which the article is assigned.
   */
  readonly project: Project;
  
  /**
   * The date when the article was last updated.
   */
  readonly updated: number;
  
  /**
   * The user who last updated the article.
   */
  readonly updatedBy: User;
  
  /**
   * The absolute URL that points to the article.
   * @since 2025.1
   */
  readonly url: string;
  
  /**
   * Constructor for Article.
   * @param author The author of the article.
   * @param project The project where the new article is created.
   * @param summary The article title.
   * @since 2021.4.23500
   */
  constructor(author: User, project: Project, summary: string);

  /**
   * Constructor for Article.
   * @param json JSON with author information, project, and summary.
   * @since 2021.4.23500
   */
  constructor(json: { author: User, project: Project, summary: string });
  
  /**
   * Creates a declaration of a rule that a user can apply to an article using a menu option.
   * @param ruleProperties A JSON object that defines the properties for the rule.
   * @returns The object representation of the rule.
   */
  static action<R extends Requirements, T extends ActionUserInputType>(ruleProperties: {
    title: string;
    command: string;
    userInput?: {
      type: T;
      description?: string;
    } | null;
    guard: (ctx: ArticleContext & { userInput?: FieldFromRequirement<T> }) => boolean;
    action: (ctx: ArticleContext & { userInput?: FieldFromRequirement<T> }) => void;
    requirements?: R;
  }): object;
  
  /**
   * Creates a new article draft.
   * @param project The project where the new article is created.
   * @param author The author of the article.
   * @returns Newly created article draft.
   */
  static createDraft(project: Project, author: User): ArticleDraft;
  
  /**
   * Searches for Article entities with extension properties that match the specified query.
   * @param extensionPropertiesQuery The extension properties query, defined as a set of key-value
   * pairs representing properties and their corresponding values.
   * @returns The set of Article entities that contain the specified extension properties.
   * @since 2024.3.43260
   */
  static findByExtensionProperties(extensionPropertiesQuery: Record<string, unknown>): YTSet<Article>;
  
  /**
   * Finds an article by its visible ID.
   * @param id The article ID.
   * @returns The article that is assigned the specified ID.
   */
  static findById(id: string): Article;
  
  /**
   * Creates a declaration of a rule that is triggered when a change is applied to an article.
   * @param ruleProperties A JSON object that defines the properties for the rule.
   * @returns The object representation of the rule.
   */
  static onChange(ruleProperties: {
    title: string;
    guard?: (ctx: ArticleContext) => boolean;
    action: (ctx: ArticleContext) => void;
    requirements?: Requirements;
    runOn?: {
      change?: boolean;
      removal?: boolean;
    };
  }): object;
  
  /**
   * Attaches a file to the article.
   * @param content The content of the file in binary or base64 form.
   * @param name The name of the file.
   * @param charset The charset of the file. Only applicable to text files.
   * @param mimeType The MIME type of the file.
   * @returns The attachment that is added to the article.
   * @since 2020.2
   */
  addAttachment(
    content: InputStream | string,
    name: string,
    charset?: string,
    mimeType?: string
  ): ArticleAttachment;

  /**
   * Attaches a file to the article.
   * @param json JSON with content of the file in binary or base64 form.
   * @returns The attachment that is added to the article.
   * @since 2020.2
   */
  addAttachment(json: { content: string | InputStream, name: string, charset?: string, mimeType?: string }): ArticleAttachment;
  
  /**
   * Adds a comment to the article.
   * @param text The text to add to the article as a comment.
   * @param author The author of the comment.
   * @returns A newly created comment.
   */
  addComment(text: string, author: User): ArticleComment;

  /**
   * Adds a comment to the article.
   * @param json JSON with text and author of the comment.
   * @returns A newly created comment.
   */
  addComment(json: { text: string, author: User }): ArticleComment;
}
