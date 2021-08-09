import { Request } from "./Request.js";
import flat from "./util/flat.js";
const { isArray } = Array;
export const DEFAULT_SEARCH_TYPE = "images";
export class Search extends Request {
    constructor({ type, url, link, linkOptions } = {}) {
        super({ url, link, linkOptions, path: "search" });
        this._type = type !== null && type !== void 0 ? type : DEFAULT_SEARCH_TYPE;
    }
    /**
     * Add a tag or set of tags to the request
     *
     * @param list A list of tags
     *
     * @example
     *
     * ```
     * // Basic example
     * import {Search} from "dinky.js"
     *
     * const search = new Search()
     *
     * search.query("princess luna")
     * ```
     *
     * @example
     * ```
     * // With a few tags to search
     * import {Search} from "dinky.js"
     *
     * const search = new Search()
     *
     * search.query("princess luna", "moonstuck")
     * ```
     *
     * @example
     * ```
     * // With a few tags, applied as a single array
     * import {Search} from "dinky.js"
     *
     * const search = new Search()
     *
     * search.query(["princess luna", "moonstuck"])
     * ```
     */
    query(...list) {
        list = flat(list);
        if (!list.length) {
            return this;
        }
        let params = this._query.get("q");
        if (isArray(params)) {
            params = params.concat(list);
        }
        else {
            params = Array.from(list);
        }
        this._query.set("q", params);
        return this;
    }
    /**
     * Sets my:faves param to the search request.
     *
     * **Note that this method requires user's key.**
     */
    faves() {
        return this.query("my:faves");
    }
    /**
     * Sets my:watched param to the search request.
     *
     * **Note that this method requires user's key.**
     */
    watched() {
        return this.query("my:watched");
    }
    /**
     * Sets my:upvotes param to the search request.
     *
     * **Note that this method requires user's key.**
     */
    upvotes() {
        return this.query("my:upvotes");
    }
    /**
     * Sets my:downvotes param to the search request.
     *
     * **Note that this method requires user's key.**
     */
    downvotes() {
        return this.query("my:downvotes");
    }
    /**
     * Sets my:uploads param to the search request.
     *
     * **Note that this method requires user's key.**
     */
    uploads() {
        return this.query("my:uploads");
    }
    /**
     * Search for the images faved by given user.
     *
     * @param user Name of the user on booru
     */
    favedBy(user) {
        return this.query(`faved_by:${user}`);
    }
    /**
     * Search for images uploaded by specified user
     *
     * @param user Name of the user on booru
     */
    uploadedBy(user) {
        return this.query(`uploader:${user}`);
    }
    /**
     * Specifies how many entities per page API will return.
     *
     * @param {number} value An amount of entities you want to take.
     */
    limit(value) {
        this._query.set("per_page", value);
        return this;
    }
    /**
     * Sets the **minimal** score of requested images.
     *
     * @param value A value of minimal score
     */
    minScore(value) {
        this._query.set("min_score", value);
        return this;
    }
    /**
     * Sets the **maximal** score of requested images.
     *
     * @param value A value of maximal score
     */
    maxScore(value) {
        this._query.set("max_score", value);
        return this;
    }
    /**
     * Sets images ordering to **ascending**.
     */
    ascending() {
        this._query.set("sd", "asc");
        return this;
    }
    /**
     * Sets images ordering to **descending**.
     */
    descending() {
        this._query.set("sd", "desc");
        return this;
    }
    /**
     * Adds a param to sort result by given field.
     *
     * @param {string} field
     */
    sortBy(field) {
        this._query.set("sf", field);
        return this;
    }
    /**
     * Sets the "sf" parameter to "random"
     */
    random() {
        return this.sortBy("random");
    }
    /**
     * Executes reverse-searching the image given by the url query parameter.
     *
     * @param url The URL of image
     * @param options Request options
     *
     * @example
     *
     * ```
     * const search = new Search()
     *
     * await search.reverse("https://derpicdn.net/img/2019/12/24/2228439/full.jpg")
     * ```
     */
    reverse(url, options) {
        this._type = "reverse";
        this._query.set("url", url);
        return this.exec(options);
    }
    /**
     * Commits current search request.
     * This method will be called implicitly once you use `await`, `.then()` or `.catch()` to perform the request.
     * You'll probably need to call it only if you want to pass per-request options.
     *
     * @param options
     *
     * @example
     * ```
     * const search = new Search()
     *
     * search.query("princess luna", "scootaloo", "sleepless in ponyville")
     *
     * await search.exec()
     * ```
     */
    async exec(options) {
        const params = this._query.get("q");
        if (isArray(params) && params.length > 0) {
            this._query.set("q", params.join(","));
        }
        else if (this._query.get("sf") === "random") {
            // Add wildcard when searching for random image,
            // but no tags has been set
            this._query.set("q", "*");
        }
        this._path[1] = this._type;
        return super.exec(options);
    }
}
