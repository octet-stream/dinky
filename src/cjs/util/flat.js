"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { isArray } = Array;
/**
 * Flattents given array
 *
 * @api private
 */
function flat(array, depth = 1) {
    const step = (prev, next) => (prev.concat(isArray(next) && depth > 0 ? flat(next, depth - 1) : [next]));
    return array.reduce(step, []);
}
exports.default = flat;
