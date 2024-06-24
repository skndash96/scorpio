"use client";
import { useState, useEffect, useRef } from "react";
import supabase from "../lib/supabase";
import { PostgrestError, PostgrestResponse } from "@supabase/supabase-js";
import Error from "../components/Error";
import Profile from "../components/Profile";
import List from "../components/List";
import Loading from "../components/Loading";
import Filters from "../components/Filters";
import { toTsquery } from "../lib/utils";
import Head from "next/head";

async function getProfiles({ words, cities, departments }: {
    words?: string,
    cities?: string[],
    departments?: string[]
}, step: number, offset: number) {
    let q = supabase
        .from("profiles")
        .select("*, accountable:reports(*)");

    if (words?.length) q = q.textSearch("name", toTsquery(words));
    if (cities?.length) q = q.textSearch("city", toTsquery(cities));
    if (departments?.length) q = q.textSearch("dept", toTsquery(departments));

    return await q
        .returns<ProfileSchema[]>()
        .order('created_at', { ascending: false })
        .range(offset, offset + step);
}

export default function Profiles() {
    let [data, setData] = useState<ProfileSchema[]>([]);
    let [error, setError] = useState<PostgrestError | null>(null);
    let [loading, setLoading] = useState<boolean>(true);

    let [cities, setCities] = useState<string[]>([]);
    let [departments, setDepts] = useState<string[]>([]);
    let [words, setWords] = useState<string>("");

    let step = useRef(20);
    let offset = useRef(0);

    useEffect(() => {
        offset.current = 0;

        setLoading(true);
        
        getProfiles({
            words, cities, departments
        }, step.current, offset.current).then((res: PostgrestResponse<ProfileSchema>) => {
            let { data, error } = res;

            setError(error);
            setData(data || []);
            setLoading(false);
        });
    }, [cities, departments, words]);

    if (error) return (
        <Error
            statusCode={500}
            message="Failed to load Profiles"
        />
    );

    return (
        <main className="p-2 max-w-2xl mx-auto">
            <Head>
                <title> Scorpio | Profiles page </title>
            </Head>

            <Filters
                label="Profiles"
                cities={cities}
                setCities={setCities}
                departments={departments}
                setDepts={setDepts}
                words={words}
                setWords={setWords}
            />

            {loading
                ? <Loading />
                : <List data={data} Component={Profile} />
            }
        </main>
    );
}