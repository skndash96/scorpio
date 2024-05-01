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
    if (e.key === "Enter") {
        e.preventDefault();

        //@ts-ignore
        e.target?.blur?.();
    }
}

/**
 * @param {string} s
 * @returns {string}
 */
export function letterOfName(s) {
    let w = s.split(/\s+/);
    return (w[1] || w[0])[0]; //ignore first word (Mr. or Mrs.)
}