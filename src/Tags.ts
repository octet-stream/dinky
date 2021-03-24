import r from "./type/responses"

import {Entities, EntitiesOptions} from "./Entities"

export class Tags extends Entities<r.Tag, r.TagsResponse> {
  constructor(options?: EntitiesOptions) {
    super({...options, path: "tags"})
  }
}
