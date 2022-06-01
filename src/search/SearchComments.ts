import type {BaseSearchOptions} from "./Search.js"
import {Search} from "./Search.js"

export interface SearchCommentsOptions extends BaseSearchOptions { }

export class SearchComments extends Search<"comments"> {
  constructor(options: SearchCommentsOptions = {}) {
    super({...options, type: "comments"})
  }
}
