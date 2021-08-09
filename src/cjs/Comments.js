"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const Entities_1 = require("./Entities");
class Comments extends Entities_1.Entities {
    constructor(options) {
        super({ ...options, path: "comments" });
    }
}
exports.Comments = Comments;
