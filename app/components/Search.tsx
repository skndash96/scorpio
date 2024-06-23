import { Dispatch, SetStateAction, useRef, useState } from "react";
import SearchInput from "./SearchInput";

export default function Search<T>({
    label,
    data,
    debounce,
    selected,
    display,
    setSelected,
    custom
}: {
    label: string,
    debounce: boolean,
    data: T[],
    selected: T[],
    display: (item: T) => string,
    setSelected: Dispatch<SetStateAction<T[]>>,
    custom: (q: string) => T
}) {
    let [query, setQuery] = useState<string>("");
    let listRef = useRef<HTMLUListElement>(null);

    let currentRef = useRef<number|null>(null); 

    const add = (item: T) => setSelected(selected => {
        return selected.includes(item) ? selected : [...selected, item];
    });

    const remove = (item: T) => setSelected(selected => {
        let idx = selected.indexOf(item);
        if (idx !== -1) selected.splice(idx, 1);

        return [...selected];
    });

    const handleKeyDown : React.KeyboardEventHandler = (event) => {
        let ul = listRef.current;
        let c = currentRef.current;

        if (!ul) return;

        let li = ul.querySelectorAll("li.show");

        if (c !== null) li[c].classList.remove("hovered");

        switch (event.key) {
            case "ArrowDown":
                currentRef.current = c === null ? 0 : c+1 === li.length ? c : c+1;
                break;
            case "ArrowUp":
                currentRef.current = c === null || c === 0 ? null : c-1;
                break;
            case "Enter":
                if (c !== null) li[c].querySelector("button")?.click();
                currentRef.current = null;
                break;
            default:
                currentRef.current = null;
        };

        c = currentRef.current;

        if(c !== null) {
            li[c].classList.add("hovered");
            li[c].scrollIntoView(false);
        };
    };

    return (
        <fieldset className="search relative">
            <label>
                {label}
            </label>

            <div>
                <ul className="flex flex-wrap gap-2">
                    {selected.map(item => (
                        <li key={display(item)} className="last:mb-2">
                            <button className="px-1 text-[.8rem] bg-fuchsia-200 bg-opacity-10" onClick={() => remove(item)}>
                                {display(item)}
                                <span className="ml-2 text-sm text-red-400">x</span>
                            </button>
                        </li>
                    ))}
                </ul>
                
                <SearchInput handleKeyDown={handleKeyDown} debounce={debounce} setQuery={setQuery} />
            </div>

            <ul ref={listRef} className="list h-72 overflow-y-auto absolute left-0 right-0 bottom-0 translate-y-full bg-fuchsia-800 border-solid border-2 border-fuchsia-400 flex-col items-stretch">
                {data.map(item => (
                    <li key={display(item)} className={!selected.includes(item) && display(item).toLowerCase().includes(query.toLowerCase()) ? "show" : "hidden"}>
                        <button className="w-full px-2 py-1 text-left hover:bg-fuchsia-600" onClick={() => add(item)}>
                            {display(item)}
                        </button>
                    </li>
                ))}

                <li>
                    <button className="show w-full px-2 py-1 text-left hover:bg-fuchsia-600" onClick={() => custom(query)}>
                        Add "{query}"
                    </button>
                </li>
            </ul>
        </fieldset>
    );
}
