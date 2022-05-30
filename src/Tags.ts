import r from "./responses.js"

import {Entities} from "./Entities.js"
import type {EntitiesOptions} from "./Entities.js"
import {instaniate} from "./util/instaniate.js"

export class Tags extends Entities<r.Tag, r.TagsResponse> {
  constructor(options?: EntitiesOptions) {
    super({...options, path: "tags"})
  }
}

export const tags = instaniate(Tags)
