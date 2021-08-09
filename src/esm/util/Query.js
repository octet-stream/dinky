import { URLSearchParams } from "url";
import isString from "./isString.js";
function assertKey(key) {
    if (!isString(key)) {
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
        return new URLSearchParams(entries).toString();
    }
    get [Symbol.toStringTag]() {
        return this.toString();
    }
}
export default Query;
