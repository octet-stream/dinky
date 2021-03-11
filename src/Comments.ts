import payloads from "./type/responses"

import {Entities, EntitiesOptions} from "./Entities"

export class Comments extends Entities<
  payloads.Comment, payloads.CommentsResponse
> {
  constructor({url, link}: EntitiesOptions) {
    super({url, link, path: "comments"})
  }
}
