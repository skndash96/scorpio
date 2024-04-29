import { months } from "./report";

/**
 * @param {string} t 
 * @returns {string}
 */
export function formatTimestamp(t) {
    let date = new Date(t);

    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

/**
 * @param {KeyboardEvent} e 
 */
export function preventFormEnter(e) {
    if (e.key === "Enter") e.preventDefault();
}