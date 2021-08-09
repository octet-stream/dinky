"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entities = void 0;
const Request_1 = require("./Request");
class Entities extends Request_1.Request {
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
exports.Entities = Entities;
