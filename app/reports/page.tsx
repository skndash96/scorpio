"use client";
import { useEffect, useRef, useState } from "react";
import supabase from "../lib/supabase";
import { PostgrestError, PostgrestResponse } from "@supabase/supabase-js";
import Report from "../components/Report";
import Error from "../components/Error";
import List from "../components/List";
import Filters from "../components/Filters";
import Loading from "../components/Loading";
import { toTsquery } from "../lib/utils";
import Head from "next/head";

async function getReports({ words, cities, departments }: {
    words?: string,
    cities?: string[],
    departments?: string[]
}, step: number, offset: number) {
    let q = supabase
        .from("reports")
        .select("*, accountable:profiles(*)");

    if (words?.length) q = q.textSearch("title", toTsquery(words));
    if (cities?.length) q = q.textSearch("city", toTsquery(cities));
    if (departments?.length) q = q.textSearch("dept", toTsquery(departments));

    return await q
        .returns<ReportSchema[]>()
        .order('created_at', { ascending: false })
        .range(offset, offset + step);
}

export default function Reports() {
    let [data, setData] = useState<ReportSchema[]>([]);
    let [error, setError] = useState<PostgrestError | null>(null);
    let [loading, setLoading] = useState<boolean>(true);

    let [cities, setCities] = useState<string[]>([]);
    let [departments, setDepts] = useState<string[]>([]);
    let [words, setWords] = useState<string>("");

    let step = useRef(20), offset = useRef(0);

    useEffect(() => {
        offset.current = 0;

        setLoading(true);
        
        getReports({
            words, cities, departments
        }, step.current, offset.current).then((res: PostgrestResponse<ReportSchema>) => {
            let { data, error } = res;

            setError(error);
            setData(data || []);
            setLoading(false);
        });
    }, [cities, departments, words]);

    if (error) {
        console.error("500, Failed to get reports", error);

        return (
            <Error
                message="Failed to load reports"
                statusCode={500}
            />
        );
    }

    return (
        <main className="p-2 pt-6 max-w-2xl mx-auto">
            <Head>
                <title> Scorpio | Reports page </title>
            </Head>

            <Filters
                label="Reports"
                cities={cities}
                setCities={setCities}
                departments={departments}
                setDepts={setDepts}
                words={words}
                setWords={setWords}
            />

            {loading
                ? <Loading />
                : <List data={data} Component={Report} />}
        </main>
    );
}
