/**
 * Type definitions for @jetbrains/youtrack-scripting-api/search
 * Based on documentation: https://www.jetbrains.com/help/youtrack/devportal/YouTrack-Api-Documentation.html
 */

import type { Issue, YTSet, User } from './entities';
import type { WatchFolder } from './entities/search';

/**
 * Returns issues that match a search query.
 * If a sort order is not specified explicitly in the query, the issues that are returned are sorted in random order.
 * @param folder The project, tag, or saved search to set as the search context.
 *              If the value for this parameter is not provided, the search includes all issues.
 *              This is equivalent to a search that is performed in the user interface with the context set to Everything.
 * @param query A YouTrack search query. If Object, supports searching by extension properties.
 * @param user The user account that executes the search query.
 *             The list of issues that is returned excludes issues that the specified user does not have permission to view.
 *             If the value for this parameter is not provided, the search query is executed on behalf of the current user.
 * @returns The set of issues found by the search.
 */
export function search(folder: WatchFolder, query: string | object, user?: User): YTSet<Issue>;
