"use client";
import { useEffect, useRef, useState } from "react";
import supabase from "../lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import Report from "../components/Report";
import Error from "../components/Error";
import List from "../components/List";
import Search from "../components/Search";
import { cities, departments } from "../lib/utils";
import SearchInput from "../components/SearchInput";

async function getReports(step: number, offset: number) {
    let q = await supabase
        .from("reports")
        .select("*, accountable:profiles(*)")
        .returns<ReportSchema[]>()
        .order('created_at', { ascending: false })
        .range(offset, offset + step);
    return q;
}

export default function Reports() {
    let [data, setData] = useState<ReportSchema[]>([]);
    let [error, setError] = useState<PostgrestError | null>(null);

    let step = useRef(20), offset = useRef(0);

    useEffect(() => {
        //initial fetch
        if (data.length) return;

        getReports(step.current, offset.current).then(({ data, error }) => {
            setError(error);
            setData(data || []);
        });
    }, []);

    if (error) {
        console.error("500, Failed to get reports", error);

        return (
            <Error
                message="Failed to load reports"
                statusCode={500}
            />
        );
    }

    let [fruits, setFruits] = useState<string[]>([]);

    return (
        <main>
            <div className="my-8">
                <ReportFilters />
            </div>

            <List data={data} Component={Report} />
        </main>
    );
}

function ReportFilters() {
    let [cs, setCs] = useState<string[]>([]);
    let [ds, setDs] = useState<string[]>([]);
    let [q, setQ] = useState<string>("");

    return (
        <form className="p-1 w-full max-w-96 flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
            <fieldset>
                <label>Words:</label>
                <SearchInput setQuery={setQ} fast={false} />
            </fieldset>

            <Search
                label="Departments"
                data={departments}
                display={s => s}
                selected={ds}
                setSelected={setDs}
                fast={true}
            />

            <Search
                label="Cities"
                data={cities}
                display={s => s}
                selected={cs}
                setSelected={setCs}
                fast={true}
            />
        </form>
    );
}