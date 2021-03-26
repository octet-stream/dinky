import r from "./type/responses"

import {Entities, EntitiesOptions} from "./Entities"
import {LinkOptions} from "./util/link"

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
