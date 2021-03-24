import r from "./type/responses.js"

import {Entities, EntitiesOptions} from "./Entities.js"
import {LinkOptions} from "./util/link.js"

export class Images extends Entities<r.Image, r.ImagesResponse> {
  constructor(options?: EntitiesOptions) {
    super({...options, path: "images"})
  }

  /**
   * Get a featured image
   */
  featured(options?: LinkOptions): Promise<r.ImageResponse> {
    this._path.push("featured")

    return this.exec(options)
  }
}
