import { Entities } from "./Entities.js";
export class Filters extends Entities {
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
