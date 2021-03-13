import r from "./type/responses"

import {Entities} from "./Entities"

export class Comments extends Entities<r.Comment, r.CommentsResponse> {
  protected _path = ["comments"]
}
