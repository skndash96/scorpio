import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
import Loading from "./Loading";
import "./search.css";

export default function SearchAsync<T>({
    label,
    getData,
    display,
    selected,
    setSelected
}: {
    label: string,
    getData: (q: string) => Promise<PostgrestSingleResponse<T[]>>,
    display: (item: T) => string,
    selected: T | null,
    setSelected: Dispatch<SetStateAction<T | null>>
}) {
    let [query, setQuery] = useState<string>("");
    let [data, setData] = useState<T[]>([]);
    let [loading, setLoading] = useState<boolean>(false);
    let [error, setError] = useState<PostgrestError | null>(null);

    useEffect(() => {
        if (query.trim().length === 0) return setData([]);

        setLoading(true);
        getData(query).then(({ data, error }) => {
            setError(error);
            error && console.error(error);
            setData(data || []);
            setLoading(false);
        });
    }, [query]);

    return (
        <fieldset className="search">
            <label>
                Tag Accountable person
            </label>

            <div className="selected">
                {selected && (
                    <button onClick={() => setSelected(null)}>
                        {display(selected)}
                        <span>x</span>
                    </button>
                )}
            </div>

            <div>
                <SearchInput
                    placeholder={"Type to find " + label}
                    setQuery={setQuery}
                    debounce={true}
                />

                <ul className="list">
                    {loading
                        ? <Loading />
                        : error
                        ? "Failed to load " + label
                        : query.trim().length === 0
                        ? "Type to search"
                        : data.length === 0
                        ? "No " + label + " found"
                        : data.map((item, idx) => (
                            <li className="show" key={idx}>
                                <button onClick={() => setSelected(item)}>
                                    {display(item)}
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </fieldset>
    );
}