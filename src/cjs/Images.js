"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Images = void 0;
const Entities_1 = require("./Entities");
class Images extends Entities_1.Entities {
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
exports.Images = Images;
