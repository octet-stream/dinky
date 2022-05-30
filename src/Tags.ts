import r from "./responses.js"

import {Entities} from "./Entities.js"
import type {EntitiesOptions} from "./Entities.js"
import {instaniate} from "./util/instaniate.js"
import {LinkOptions} from "util/link.js"

export class Tags extends Entities<r.Tag, r.TagsResponse> {
  constructor(options?: EntitiesOptions) {
    super({...options, path: "tags"})
  }

  /**
   * Request a tag by its ID (e. g. slug)
   *
   * @param id Tag slug parameter
   * @param options Additional link options
   *
   * @example
   * ```js
   * import {Tags} from "dinky.js"
   *
   * const tags = new Tags()
   *
   * await tags.getById("artist-colon-rainbow")
   * ```
   */
  getById(id: string, options?: LinkOptions): Promise<r.Tag> {
    // TODO: Add slug normalization
    return super.getById(id, options)
  }
}

export const tags = instaniate(Tags)
