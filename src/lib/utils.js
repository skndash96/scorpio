import { months } from "./report";

/**
 * @param {string} t 
 * @returns {string}
 */
export function formatTimestamp(t) {
    let date = new Date(t);

    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}