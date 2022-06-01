import type {BaseSearchOptions} from "./Search.js"
import {Search} from "./Search.js"

export interface SearchTagsOptions extends BaseSearchOptions { }

/**
 * Implements `tags` search interface
 *
 * Endpoint `/api/v1/json/search/tags`
 */
export class SearchTags extends Search<"tags"> {
  constructor(options: SearchTagsOptions = {}) {
    super({...options, type: "tags"})
  }
}
