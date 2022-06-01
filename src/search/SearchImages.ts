import type {BaseSearchOptions} from "./Search.js"
import {Search} from "./Search.js"

export interface SearchImagesOptions extends BaseSearchOptions { }

export class SearchImages extends Search<"images"> {
  constructor(options: SearchImagesOptions = {}) {
    super({...options, type: "images"})
  }
}
