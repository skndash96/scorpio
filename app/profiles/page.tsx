"use client";
import { useState, useEffect, useRef } from "react";
import supabase from "../lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import Error from "../components/Error";
import Profile from "../components/Profile";

async function getProfiles(step: number, offset: number) {
    let q = await supabase
        .from("profiles")
        .select("*, accountable:reports(*)")
        .returns<ProfileSchema[]>()
        .order('created_at', { ascending: false })
        .range(offset, offset + step);
    return q;
}

export default function Profiles() {
    let [data, setData] = useState<ProfileSchema[]>([]);
    let [error, setError] = useState<PostgrestError|null>(null);
    let step = useRef(20);
    let offset = useRef(0);
    
    useEffect(() => {
        getProfiles(step.current, offset.current)
        .then(({ data, error }) => {
            if (error) setError(error);
            setData(data || []);
        });
    }, []);

    if (error) return (
        <Error
            statusCode={500}
            message="Failed to load Profiles"
        />
    )

    return (
        <main>
            <div className="list">
                {data.map((record, idx) => (
                    <Profile key={idx} expand={false} record={record} />
                ))}
            </div>
        </main>
    );
}