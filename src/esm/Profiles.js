import { Entities } from "./Entities.js";
export class Profiles extends Entities {
    constructor(options) {
        super({ ...options, path: "profiles" });
    }
}
