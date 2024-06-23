import { useRef } from "react";
import { IoSearch as SearchIcon } from "react-icons/io5";

export default function SearchInput({
    setQuery,
    handleKeyDown,
    fast
}: {
    setQuery: (q: string) => void,
    handleKeyDown?: React.KeyboardEventHandler
    fast: boolean
}) {
    const bounce = fast ? 0 : 300;

    let tm = useRef<NodeJS.Timeout>();
    let inputRef = useRef<HTMLInputElement>(null);

    const handleInput : React.FormEventHandler<HTMLInputElement> = (event) => {
        if (tm.current) clearTimeout(tm.current);

        tm.current = setTimeout(() => setQuery(inputRef.current?.value || ""), bounce);
    };

    const _handleKeyDown : React.KeyboardEventHandler = (event) => {
        if (event.key === "Enter") event.preventDefault();

        handleKeyDown && handleKeyDown(event);
    };

    return (
        <div className="w-full flex items-center bg-fuchsia-50 bg-opacity-10">
            <SearchIcon className="opacity-75 text-fuchsia-400" size={24} />

            <input
                className="grow px-2 py-1"
                type="search"
                placeholder="Type to search"
                onInput={handleInput}
                onKeyDown={_handleKeyDown}
                ref={inputRef}
            />
        </div>
    )
}