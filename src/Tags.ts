import r from "./type/responses.js"

import {Entities, EntitiesOptions} from "./Entities.js"

export class Tags extends Entities<r.Tag, r.TagsResponse> {
  constructor(options?: EntitiesOptions) {
    super({...options, path: "tags"})
  }
}
