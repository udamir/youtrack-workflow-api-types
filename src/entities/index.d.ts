/**
 * Main index file for YouTrack Scripting API entities
 * This file re-exports all entity types from separate modules for both direct and namespace access
 */

// Import all modules
export * from './workitem';
export * from './helpdesk';
export * from './articles';
export * from './project';
export * from './search';
export * from './issue';
export * from './agile';
export * from './field';
export * from './user';
export * from './core';
export * from './vcs';
export * from './tag';

import * as core from './core';

// biome-ignore lint/suspicious/noShadowRestrictedNames: 
export import Set = core.YTSet;
