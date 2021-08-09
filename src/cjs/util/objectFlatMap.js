"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPlainObject_1 = __importDefault(require("./isPlainObject"));
const { isArray } = Array;
const { entries } = Object;
function objectFlatMap(object, fn, ctx) {
    const result = isArray(object) ? [] : {};
    for (const [key, value] of entries(object)) {
        if (isArray(value) || isPlainObject_1.default(value)) {
            result[key] = objectFlatMap(value, fn, ctx);
        }
        else {
            result[key] = fn.call(ctx, value, key, object);
        }
    }
    return result;
}
exports.default = objectFlatMap;
