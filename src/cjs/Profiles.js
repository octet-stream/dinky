"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profiles = void 0;
const Entities_1 = require("./Entities");
class Profiles extends Entities_1.Entities {
    constructor(options) {
        super({ ...options, path: "profiles" });
    }
}
exports.Profiles = Profiles;
