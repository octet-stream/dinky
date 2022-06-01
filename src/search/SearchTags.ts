import type {BaseSearchOptions} from "./Search.js"
import {Search} from "./Search.js"

export interface SearchTagsOptions extends BaseSearchOptions { }

export class SearchTags extends Search<"tags"> {
  constructor(options: SearchTagsOptions = {}) {
    super({...options, type: "tags"})
  }
}
