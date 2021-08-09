import r from "./responses.js"

import {Entities, EntitiesOptions} from "./Entities.js"

export class Comments extends Entities<r.Comment, r.CommentsResponse> {
  constructor(options?: EntitiesOptions) {
    super({...options, path: "comments"})
  }
}
