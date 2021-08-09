import r from "./responses"

import {Entities, EntitiesOptions} from "./Entities"
import {LinkOptions} from "./util/link"

export class Filters extends Entities<r.Filter, r.FiltersResponse> {
  constructor(options?: EntitiesOptions) {
    super({...options, path: "filters"})
  }

  system(options?: LinkOptions): Promise<r.FiltersResponse> {
    return this._link([...this._path, "system"], this._query, options)
  }

  user(options?: LinkOptions) {
    return this._link([...this._path, "user"], this._query, options)
  }
}
