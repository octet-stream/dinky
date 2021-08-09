"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const link_1 = require("./util/link");
const Query_1 = __importDefault(require("./util/Query"));
const { isArray } = Array;
class Request {
    constructor({ url, path, link, linkOptions }) {
        this._query = new Query_1.default();
        this._link = link !== null && link !== void 0 ? link : link_1.createLink({ url, linkOptions });
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
exports.Request = Request;
