import { Entities } from "./Entities.js";
export class Images extends Entities {
    constructor(options) {
        super({ ...options, path: "images" });
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
    featured(options) {
        return this._link([...this._path, "featured"], this._query, options);
    }
}
