"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objectFlatMap_1 = __importDefault(require("./objectFlatMap"));
const fields = [
    "createdAt",
    "firstSeenAt",
    "updatedAt",
    "lastRepliedToAt",
    "avardedAt",
    "editedAt",
];
/**
 * Casts string dates to the Date object for fields in the above list
 *
 * @param object An object of the API response
 */
const castDates = (object) => objectFlatMap_1.default(object, (value, key) => {
    if (!fields.includes(key)) {
        return value;
    }
    // In case of an invalid date we'll return its value as is
    return Number.isNaN(Date.parse(value)) ? value : new Date(value);
});
exports.default = castDates;
