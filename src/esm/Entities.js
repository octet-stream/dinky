import { Request } from "./Request.js";
export class Entities extends Request {
    /**
     * Gets one entity by their ID
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
    getById(id, options) {
        return this._link([...this._path, String(id)], this._query, options);
    }
}
