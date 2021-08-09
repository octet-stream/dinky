import { URL } from "url";
import fetch from "isomorphic-fetch";
import camelCase from "camelcase-keys";
import NetworkError from "./NetworkError.js";
import waterfall from "./waterfall.js";
import cast from "./castDates.js";
export const DEFAULT_URL = "https://derpibooru.org";
const linkDefaults = {
    fetch,
    fetchOptions: {
        method: "get"
    }
};
const defaults = {
    url: DEFAULT_URL,
    linkOptions: linkDefaults
};
const normalize = (input) => camelCase(input, { deep: true });
function parse(response) {
    if (!response.ok) {
        throw new NetworkError(`Network error: ${response.statusText}`, response);
    }
    return response.json();
}
/**
 * Creates a new link for target url
 */
export function createLink(options = {}) {
    const { url, linkOptions } = {
        ...defaults,
        ...options,
        linkOptions: {
            ...defaults === null || defaults === void 0 ? void 0 : defaults.linkOptions,
            ...options === null || options === void 0 ? void 0 : options.linkOptions
        }
    };
    const target = new URL(url);
    /**
     * Sends a request to Phelomena API
     */
    return async function link(path, query, requestOptions) {
        // TODO: Should probably make base endpoint configurable
        path = ["/api/v1/json", ...path].filter(Boolean);
        const { key, filter, fetch: call, fetchOptions } = {
            ...linkOptions,
            ...requestOptions,
            fetchOptions: {
                ...linkOptions.fetchOptions,
                ...requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.fetchOptions
            }
        };
        if (key) {
            query.set("key", key);
        }
        if (filter) {
            query.set("filter_id", filter);
        }
        target.pathname = path.join("/").replace(/\/{2,}/g, "/");
        target.search = query.toString();
        const promise = call(target.toString(), fetchOptions);
        return waterfall([parse, normalize, cast], promise);
    };
}
export default createLink;
