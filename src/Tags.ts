import payloads from "./type/responses"

import {Entities, EntitiesOptions} from "./Entities"

export class Tags extends Entities<payloads.Tag, payloads.TagsResponse> {
  constructor({url, link}: EntitiesOptions) {
    super({url, link, path: "tags"})
  }
}
