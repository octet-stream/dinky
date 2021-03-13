import r from "./type/responses"

import {Entities} from "./Entities"

export class Tags extends Entities<r.Tag, r.TagsResponse> {
  protected _path = ["tags"]
}
