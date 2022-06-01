import type {BaseSearchOptions} from "./Search.js"
import {Search} from "./Search.js"

export interface SearchGalleriesOptions extends BaseSearchOptions { }

export class SearchGalleries extends Search<"galleries"> {
  constructor(options: SearchGalleriesOptions = {}) {
    super({...options, type: "galleries"})
  }
}
