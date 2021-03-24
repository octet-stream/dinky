import {LinkOptions, createLink} from "./util/link"

import {Request} from "./Request"

export interface EntitiesOptions {
  url?: string
  link?: ReturnType<typeof createLink>
  linkOptions?: LinkOptions
}

export abstract class Entities<Response, Page> extends Request<Page> {
  /**
   * Gets one entity by ID
   */
  getById(id: number, options?: LinkOptions): Promise<Response> {
    this._path.push(String(id))

    return this.exec(options)
  }
}
