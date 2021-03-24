import r from "./type/responses"

import {Entities, EntitiesOptions} from "./Entities.js"

export class Comments extends Entities<r.Comment, r.CommentsResponse> {
  constructor(options?: EntitiesOptions) {
    super({...options, path: "comments"})
  }
}
