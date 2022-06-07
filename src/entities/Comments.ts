import r from "../responses.js"

import {Entities} from "./Entities.js"
import type {EntitiesOptions} from "./Entities.js"
import {instaniate} from "../util/instaniate.js"

/**
 * Implements `comments` entites interface.
 *
 * Endpoint `/api/v1/json/comments`
 */
export class Comments extends Entities<r.Comment, r.CommentsResponse> {
  constructor(options?: EntitiesOptions) {
    super({...options, path: "comments"})
  }
}

export const comments = instaniate(Comments)
