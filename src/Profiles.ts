import r from "./responses"

import {Entities, EntitiesOptions} from "./Entities"

export class Profiles extends Entities<r.User, r.UserResponse> {
  constructor(options?: EntitiesOptions) {
    super({...options, path: "profiles"})
  }
}
