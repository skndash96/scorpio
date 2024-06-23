const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatTimestamp(s: string) {
    let d = new Date(s);
    return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
}

export function getLetters(s: string) {
    let w = s.split(/\s+/);

    let f = w[0].toLowerCase();

    if (f.startsWith("mr") || f.startsWith("ms") || f.startsWith("bro")) w = w.slice(1);

    return w.map(w => w[0].toUpperCase()).join("");
}