import type {BaseSearchOptions} from "./Search.js"
import {Search} from "./Search.js"

export interface SearchPostsOptions extends BaseSearchOptions { }

export class SearchPosts extends Search<"posts"> {
  constructor(options: SearchPostsOptions = {}) {
    super({...options, type: "posts"})
  }
}
