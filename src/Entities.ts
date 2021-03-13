import {LinkOptions, createLink} from "./util/link"

import Request from "./Request"

export interface EntitiesOptions {
  url?: string
  link?: ReturnType<typeof createLink>
  linkOptions?: LinkOptions
}

export abstract class Entities<R, P> extends Request<P> {
  constructor({url, link, linkOptions}: EntitiesOptions) {
    // Path must be set in actual Entity through _path field inheritance!
    super({url, link, linkOptions, path: []})
  }

  /**
   * Gets one entity by ID
   */
  getById(id: number, options?: LinkOptions): Promise<R> {
    this._path.push(String(id))

    return this.exec(options)
  }
}
