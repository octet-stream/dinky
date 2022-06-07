import r from "../responses"

import {Entities} from "./Entities.js"
import type {EntitiesOptions} from "./Entities.js"
import {instaniate} from "../util/instaniate.js"

/**
 * Implements `profiles` entites interface.
 *
 * Endpoint `/api/v1/json/profiles`
 */
export class Profiles extends Entities<r.User, r.UserResponse> {
  constructor(options?: EntitiesOptions) {
    super({...options, path: "profiles"})
  }
}

export const profiles = instaniate(Profiles)
