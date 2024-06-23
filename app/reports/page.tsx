"use client";
import { useEffect, useRef, useState } from "react";
import supabase from "../lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import Report from "../components/Report";
import Error from "../components/Error";

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

    return (
        <main>
            <div className="list">
                {data.map((record, idx) => (
                    <Report key={idx} expand={false} record={record} />
                ))}
            </div>
        </main>
    );
}