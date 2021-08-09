"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tags = void 0;
const Entities_1 = require("./Entities");
class Tags extends Entities_1.Entities {
    constructor(options) {
        super({ ...options, path: "tags" });
    }
}
exports.Tags = Tags;
