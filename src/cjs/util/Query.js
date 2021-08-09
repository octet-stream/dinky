"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const isString_1 = __importDefault(require("./isString"));
function assertKey(key) {
    if (!isString_1.default(key)) {
        throw TypeError("Given key must be a string.");
    }
}
class Query extends Map {
    set(key, value) {
        assertKey(key);
        return super.set(key, value);
    }
    get(key) {
        assertKey(key);
        return super.get(key);
    }
    has(key) {
        assertKey(key);
        return super.has(key);
    }
    delete(key) {
        assertKey(key);
        return super.delete(key);
    }
    toString() {
        const entries = [];
        for (const [key, value] of this) {
            // Omit all nullish and falsy params as of they aren't necessary
            if (value || value === 0) {
                entries.push([key, String(value)]);
            }
        }
        // Use URLSearchParams to stringify entries
        return new url_1.URLSearchParams(entries).toString();
    }
    get [Symbol.toStringTag]() {
        return this.toString();
    }
}
exports.default = Query;
