import {LinkOptions} from "../util/link.js"

import {Request, RequestOptionsWithoutPath} from "../Request.js"

export type EntitiesOptions = RequestOptionsWithoutPath

export abstract class Entities<Response, Page> extends Request<Page> {
  /**
   * Gets one entity by their ID
   *
   * @param id Entity unique ID
   * @param options Additional link options
   *
   * @example
   * ```
   * // You won't use this method directly from Entities, so let's say we want to get the first ever picture from Derpibooru:
   * import {Images} from "dinky.js"
   *
   * const images = new Images()
   *
   * await images.getById(0)
   * ```
   */
  getById(id: number | string, options?: LinkOptions): Promise<Response> {
    return this._link([...this._path, String(id)], this._query, options)
  }
}
