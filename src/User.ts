import r from "./type/responses.js"

import {Entities, EntitiesOptions} from "./Entities.js"

export class User extends Entities<r.User, r.UserResponse> {
  constructor(options?: EntitiesOptions) {
    super({...options, path: "profiles"})
  }
}

export default User
