"use client";
import Head from "next/head";
import Image from "next/image";
import Search from "../components/Search";
import { cities as citiesArr, departments as deptsArr } from "../lib/utils";
import { useState } from "react";
import SearchAsync from "../components/SearchAsync";
import supabase from "../lib/supabase";

export default function Write() {
    let [error, setError] = useState<string|null>(null);

    function showError(s: string|null) {
        setError(s);
        s && setTimeout(() => setError(null), 5000);
    }
    
    let [dept, setDept] = useState<string[]>([]);
    let [city, setCity] = useState<string[]>([]);
    let [date, setDate] = useState<string>();
    let [title, setTitle] = useState<string>("");
    let [content, setContent] = useState<string>("");
    let [accountable, setAccountable] = useState<ProfileSchema|null>(null);

    async function getData(q: string) {
        return await supabase
            .from("profiles")
            .select("id, name")
            .ilike("name", `%${q}%`)
            .returns<ProfileSchema[]>()
            .limit(20);
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        showError(null);

        if (!dept || !city || !date || !title || !content) {
            showError("Please fill all required inputs");
        } else if (title.length > 100 || title.length < 10) {
            showError("Title length must be between 10 and 100 charecters");
        } else if (content.length < 200) {
            showError("Report must be atleast 200 charecters long");
        } else if (city.length < 5 || city.length > 50) {
            showError("City name length must be between 5 and 50");
        } else if (dept.length < 5 || dept.length > 50) {
            showError("Department name length must be between 5 and 50");
        } else {
            let r : ReportBuilder = {
                title,
                city: city[0],
                dept: dept[0],
                info: content,
                accountable: accountable?.id || null,
                created_at: date
            };

            let { error } = await supabase.from("reports").insert(r);
            if (error) {
                showError("Failed to add report, try again later");
            }
        }
    }

    return (
        <main className="p-2 py-8 max-w-xl mx-auto">
            <Head>
                <title> Scorpio | Write Report </title>
            </Head>

            <h1 className="flex items-center gap-2 text-2xl font-semibold">
                <Image alt="write icon" width={30} height={30} src="/write.png" />
                Write
            </h1>

            <form className="px-4 mt-4 flex flex-col gap-4 *:flex *:flex-col *:gap-1" onSubmit={e => e.preventDefault()}>
                <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                    <Search
                        label="Department"
                        data={deptsArr}
                        display={s => s}
                        selected={dept}
                        setSelected={setDept}
                        debounce={false}
                        custom={s => s}
                        isSingle={true}
                    />

                    <Search
                        label="City"
                        data={citiesArr}
                        display={s => s}
                        selected={city}
                        setSelected={setCity}
                        debounce={false}
                        custom={s => s}
                        isSingle={true}
                    />
                </div>

                <fieldset>
                    <label>
                        Date
                    </label>

                    <input
                        className="p-2 bg-fuchsia-200 bg-opacity-10 w-fit"
                        onChange={(e) => setDate(e.target.value)}
                        type="date"
                        style={{"colorScheme": "dark"}}
                    />
                </fieldset>

                <fieldset>
                    <label>
                        Title
                    </label>

                    <input
                        className="p-2 bg-fuchsia-200 bg-opacity-10"
                        type="text"
                        placeholder="enter suitable title"
                        onChange={e => setTitle(e.target.value)}
                    />
                </fieldset>

                <fieldset>
                    <label>
                        Report
                    </label>

                    <textarea
                        className="p-2 min-h-52 bg-fuchsia-200 bg-opacity-10 resize-y"
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="type your report"
                    />
                </fieldset>

                <SearchAsync
                    label="Profiles"
                    getData={getData}
                    selected={accountable}
                    setSelected={setAccountable}
                    display={item => item.name}
                />

                <button className="p-2 w-fit mx-auto bg-fuchsia-700 border-2 border-solid border-transparent hover:border-fuchsia-400" onClick={handleSubmit} type="submit">
                    Submit
                </button>

                {error && (
                    <p className="bad toast">
                        {error}
                    </p>
                )}
            </form>
        </main>
    );
}