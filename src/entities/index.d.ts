/**
 * Main index file for YouTrack Scripting API entities
 * This file re-exports all entity types from separate modules for both direct and namespace access
 */

// Import all modules
import * as workitem from './workitem';
import * as helpdesk from './helpdesk';
import * as articles from './articles';
import * as project from './project';
import * as search from './search';
import * as issue from './issue';
import * as agile from './agile';
import * as field from './field';
import * as user from './user';
import * as core from './core';
import * as vcs from './vcs';
import * as tag from './tag';


// Re-export all types from workitem module
export import IssueWorkItem = workitem.IssueWorkItem;
export import WorkItemType = workitem.WorkItemType;

// Re-export all types from helpdesk module
export import Calendar = helpdesk.Calendar;
export import Channel = helpdesk.Channel;

// Re-export all types from articles module
export import BaseArticle = articles.BaseArticle;

// Re-export all types from project module
export import Project = project.Project;

// Re-export all types from search module
export import WatchFolder = search.WatchFolder;
export import SavedQuery = search.SavedQuery;

// Re-export all types from issue module
export import Issue = issue.Issue;
export import IssueComment = issue.IssueComment;
export import IssueAttachment = issue.IssueAttachment;
export import IssueRuleContext = issue.IssueRuleContext;
export import IssueCommentActionContext = issue.IssueCommentActionContext;
export import IssueAttachmentActionContext = issue.IssueAttachmentActionContext;
export import BaseComment = issue.BaseComment;

// Re-export all types from agile module
export import Sprint = agile.Sprint;
export import Agile = agile.Agile;

// Re-export all types from field module
export import Fields = field.Fields;

// Re-export all types from user module
export import User = user.User;
export import UserGroup = user.UserGroup;
export import ProjectTeam = user.ProjectTeam;

// Re-export all types from core module
export import BaseEntity = core.BaseEntity;
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export import Set = core.YTSet;
export import Requirements = core.Requirements;
export import PersistentFile = core.PersistentFile;

// Re-export all types from vcs module
export import PullRequest = vcs.PullRequest;
export import VcsChange = vcs.VcsChange;

// Re-export all types from tag module
export import Tag = tag.Tag;
