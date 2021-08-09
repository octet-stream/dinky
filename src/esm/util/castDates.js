import map from "./objectFlatMap.js";
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
const castDates = (object) => map(object, (value, key) => {
    if (!fields.includes(key)) {
        return value;
    }
    // In case of an invalid date we'll return its value as is
    return Number.isNaN(Date.parse(value)) ? value : new Date(value);
});
export default castDates;
