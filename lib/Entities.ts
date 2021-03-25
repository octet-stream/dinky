import {LinkOptions} from "./util/link"

import {Request, RequestOptionsWithoutPath} from "./Request"

export type EntitiesOptions = RequestOptionsWithoutPath

export abstract class Entities<Response, Page> extends Request<Page> {
  /**
   * Gets one entity by ID
   */
  getById(id: number, options?: LinkOptions): Promise<Response> {
    this._path.push(String(id))

    return this.exec(options)
  }
}
