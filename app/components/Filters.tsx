import { Dispatch, SetStateAction, useState } from "react";
import { IoFilter as FilterIcon } from "react-icons/io5";
import SearchInput from "./SearchInput";
import Search from "./Search";
import { cities as citiesArr, departments as deptArr } from "../lib/utils";

export default function Filters({
    label,
    cities,
    setCities,
    departments,
    setDepts,
    words,
    setWords
}: {
    label: string,
    cities: string[],
    setCities: Dispatch<SetStateAction<string[]>>,
    departments: string[],
    setDepts: Dispatch<SetStateAction<string[]>>,
    words: string,
    setWords: Dispatch<SetStateAction<string>>

}) {
    let [open, setOpen] = useState<boolean>(false);

    const toggleForm = () => setOpen(open => !open);

    return (
        <div>
            <button className="p-2 flex items-center gap-2 hover:bg-fuchsia-200 hover:bg-opacity-10" onClick={toggleForm}>
                <FilterIcon />
                Filter {label}
            </button>

            <form className={`${open ? "block mb-8" : "hidden"} p-1 w-full flex flex-col gap-4 border-solid px-4 border-0 border-l-2 border-fuchsia-500`} onSubmit={e => e.preventDefault()}>
                <fieldset>
                    <label>Words:</label>
                    <SearchInput setQuery={setWords} debounce={true} placeholder={"Type to search "+label} />
                </fieldset>

                <Search
                    label="Departments"
                    data={deptArr}
                    display={s => s}
                    selected={departments}
                    setSelected={setDepts}
                    debounce={false}
                    custom={s => s}
                />

                <Search
                    label="Cities"
                    data={citiesArr}
                    display={s => s}
                    selected={cities}
                    setSelected={setCities}
                    debounce={false}
                    custom={s => s}
                />
            </form>
        </div>
    );
}