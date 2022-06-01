import r from "../responses"

import {Entities} from "./Entities.js"
import type {EntitiesOptions} from "./Entities.js"
import type {LinkOptions} from "../util/link.js"
import {instaniate} from "../util/instaniate.js"

export class Filters extends Entities<r.Filter, r.FiltersResponse> {
  constructor(options?: EntitiesOptions) {
    super({...options, path: "filters"})
  }

  /**
   * Returns list of the system filters
   */
  system(options?: LinkOptions): Promise<r.FiltersResponse> {
    return this._link([...this._path, "system"], this._query, options)
  }

  /**
   * Returns list of public filters, created by users
   */
  user(options?: LinkOptions): Promise<r.FiltersResponse> {
    return this._link([...this._path, "user"], this._query, options)
  }
}

export const filters = instaniate(Filters)
