"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filters = void 0;
const Entities_1 = require("./Entities");
class Filters extends Entities_1.Entities {
    constructor(options) {
        super({ ...options, path: "filters" });
    }
    system(options) {
        return this._link([...this._path, "system"], this._query, options);
    }
    user(options) {
        return this._link([...this._path, "user"], this._query, options);
    }
}
exports.Filters = Filters;
