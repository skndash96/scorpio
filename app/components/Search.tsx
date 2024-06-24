import { Dispatch, SetStateAction, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import "./search.css";

export default function Search<T>({
    label,
    data,
    debounce,
    selected,
    display,
    setSelected,
    custom,
    isSingle = false
}: {
    label: string,
    debounce: boolean,
    data: T[],
    selected: T[],
    display: (item: T) => string,
    setSelected: Dispatch<SetStateAction<T[]>>,
    custom: (q: string) => T,
    isSingle?: boolean
}) {
    let [query, setQuery] = useState<string>("");

    const add = (item: T) => setSelected(selected => {
        if (isSingle) return [item];

        return selected.includes(item) ? selected : [...selected, item];
    });

    const remove = (item: T) => setSelected(selected => {
        if (isSingle) return [];

        let idx = selected.indexOf(item);
        if (idx !== -1) selected.splice(idx, 1);

        return [...selected];
    });

    return (
        <fieldset className="search relative">
            <label>
                {label}
            </label>

            <ul className="selected flex flex-wrap gap-2">
                {selected.map(item => (
                    <li key={display(item)} className="last:mb-2">
                        <button className="" onClick={() => remove(item)}>
                            {display(item)}
                            <span>x</span>
                        </button>
                    </li>
                ))}
            </ul>

            <div>
                <SearchInput debounce={debounce} setQuery={setQuery} />

                <ul className="list">
                    {data.map(item => (
                        <li key={display(item)} className={!selected.includes(item) && display(item).toLowerCase().includes(query.toLowerCase()) ? "show" : "hidden"}>
                            <button onClick={() => add(item)}>
                                {display(item)}
                            </button>
                        </li>
                    ))}

                    <li>
                        <button className="show w-full px-2 py-1 text-left hover:bg-fuchsia-600" onClick={() => custom(query)}>
                            Add &quot;{query}&quot;
                        </button>
                    </li>
                </ul>
            </div>
        </fieldset>
    );
}
