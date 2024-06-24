import { useRef } from "react";
import { IoSearch as SearchIcon } from "react-icons/io5";

export default function SearchInput({
    setQuery,
    debounce,
    placeholder = "Type to search"
}: {
    setQuery: (q: string) => void,
    debounce: boolean,
    placeholder?: string
}) {
    const bounce = debounce ? 500 : 0;

    let currentRef = useRef<number|null>(null); //auto complete

    let tm = useRef<NodeJS.Timeout>();
    let inputRef = useRef<HTMLInputElement>(null);

    const handleInput : React.FormEventHandler<HTMLInputElement> = (event) => {
        if (tm.current) clearTimeout(tm.current);

        tm.current = setTimeout(() => setQuery(inputRef.current?.value || ""), bounce);
    };

    const handleKeyDown : React.KeyboardEventHandler = (event) => {
        if (event.key === "Enter") event.preventDefault();

        let ul = inputRef.current?.parentElement?.parentElement?.querySelector(".list");
        if (!ul) return;

        let c = currentRef.current;

        let li = ul.querySelectorAll("li.show");
        if (li.length === 0) {
            currentRef.current = null;
            return;
        }

        if (c !== null) li[c].classList.remove("hovered");

        switch (event.key) {
            case "ArrowDown":
                currentRef.current = c === null ? 0 : c + 1 === li.length ? c : c + 1;
                break;
            case "ArrowUp":
                currentRef.current = c === null || c === 0 ? null : c - 1;
                break;
            case "Enter":
                if (c !== null) li[c].querySelector("button")?.click();
                currentRef.current = null;
                break;
            default:
                currentRef.current = null;
        };

        c = currentRef.current;

        if (c !== null) {
            li[c].classList.add("hovered");
            li[c].scrollIntoView(false);
        };
    };

    return (
        <div className="w-full flex items-center bg-fuchsia-50 bg-opacity-10">
            <SearchIcon className="opacity-75 text-fuchsia-400" size={24} />

            <input
                className="grow px-2 py-1"
                type="search"
                placeholder={placeholder}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />
        </div>
    )
}