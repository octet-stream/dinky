import type {BaseSearchOptions} from "./Search.js"
import {Search} from "./Search.js"

export interface SearchPostsOptions extends BaseSearchOptions { }

/**
 * Implements `posts` search interface
 *
 * Endpoint `/api/v1/json/search/posts`
 */
export class SearchPosts extends Search<"posts"> {
  constructor(options: SearchPostsOptions = {}) {
    super({...options, type: "posts"})
  }
}
