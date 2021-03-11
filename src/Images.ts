import payloads from "./type/responses"

import {Entities, EntitiesOptions} from "./Entities"
import {LinkOptions} from "./util/link"

export class Images extends Entities<payloads.Image, payloads.ImagesResponse> {
  constructor({url, link}: EntitiesOptions) {
    super({url, link, path: "images"})
  }

  /**
   * Get a featured image
   */
  featured(options?: LinkOptions): Promise<payloads.ImageResponse> {
    this._path.push("featured")

    return this.exec(options)
  }
}
