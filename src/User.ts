import r from "./type/responses"

import {Entities, EntitiesOptions} from "./Entities";

class User extends Entities<r.User, r.UserResponse> {
  constructor(options?: EntitiesOptions) {
    super({...options, path: "profiles"})
  }
}

export default User
