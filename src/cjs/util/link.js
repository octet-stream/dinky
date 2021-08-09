"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLink = exports.DEFAULT_URL = void 0;
const url_1 = require("url");
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
const NetworkError_1 = __importDefault(require("./NetworkError"));
const waterfall_1 = __importDefault(require("./waterfall"));
const castDates_1 = __importDefault(require("./castDates"));
exports.DEFAULT_URL = "https://derpibooru.org";
const linkDefaults = {
    fetch: isomorphic_fetch_1.default,
    fetchOptions: {
        method: "get"
    }
};
const defaults = {
    url: exports.DEFAULT_URL,
    linkOptions: linkDefaults
};
const normalize = (input) => camelcase_keys_1.default(input, { deep: true });
function parse(response) {
    if (!response.ok) {
        throw new NetworkError_1.default(`Network error: ${response.statusText}`, response);
    }
    return response.json();
}
/**
 * Creates a new link for target url
 */
function createLink(options = {}) {
    const { url, linkOptions } = {
        ...defaults,
        ...options,
        linkOptions: {
            ...defaults === null || defaults === void 0 ? void 0 : defaults.linkOptions,
            ...options === null || options === void 0 ? void 0 : options.linkOptions
        }
    };
    const target = new url_1.URL(url);
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
        return waterfall_1.default([parse, normalize, castDates_1.default], promise);
    };
}
exports.createLink = createLink;
exports.default = createLink;
