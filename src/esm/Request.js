import { createLink } from "./util/link.js";
import Query from "./util/Query.js";
const { isArray } = Array;
export class Request {
    constructor({ url, path, link, linkOptions }) {
        this._query = new Query();
        this._link = link !== null && link !== void 0 ? link : createLink({ url, linkOptions });
        this._path = isArray(path) ? path : [path];
    }
    /**
     * Sets the page number
     */
    page(value = 1) {
        this._query.set("page", value);
        return this;
    }
    exec(options) {
        return this._link(this._path, this._query, options);
    }
    then(onFulfilled, onRejected) {
        return this.exec().then(onFulfilled, onRejected);
    }
    catch(onRejected) {
        return this.exec().catch(onRejected);
    }
}
