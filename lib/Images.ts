import r from "./responses"

import {Entities, EntitiesOptions} from "./Entities"
import {LinkOptions} from "./util/link"

export class Images extends Entities<r.Image, r.ImagesResponse> {
  constructor(options?: EntitiesOptions) {
    super({...options, path: "images"})
  }

  /**
   * Returns featured image
   *
   * @example
   * ```
   * import {Images} from "dinky.js"
   *
   * const images = new Images()
   *
   * await images.featured()
   * ```
   */
  featured(options?: LinkOptions): Promise<r.ImageResponse> {
    return this._link([...this._path, "featured"], this._query, options)
  }
}
