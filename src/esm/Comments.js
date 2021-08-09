import { Entities } from "./Entities.js";
export class Comments extends Entities {
    constructor(options) {
        super({ ...options, path: "comments" });
    }
}
