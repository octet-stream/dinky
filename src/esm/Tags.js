import { Entities } from "./Entities.js";
export class Tags extends Entities {
    constructor(options) {
        super({ ...options, path: "tags" });
    }
}
