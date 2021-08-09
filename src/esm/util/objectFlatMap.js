import isPlainObject from "./isPlainObject.js";
const { isArray } = Array;
const { entries } = Object;
function objectFlatMap(object, fn, ctx) {
    const result = isArray(object) ? [] : {};
    for (const [key, value] of entries(object)) {
        if (isArray(value) || isPlainObject(value)) {
            result[key] = objectFlatMap(value, fn, ctx);
        }
        else {
            result[key] = fn.call(ctx, value, key, object);
        }
    }
    return result;
}
export default objectFlatMap;
