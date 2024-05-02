<script>
    import { onMount } from "svelte";
    import supabase from "./supabase";
    import { browser } from "$app/environment";
    import Loading from "./Loading.svelte";

    export let /**@type {"profiles"|"reports"}*/ table,
        /**@type {string|null}*/ city,
        /**@type {string|null}*/ dept,
        /**@type {string}*/ words,
        component;

    words = words.trim();

    /**@type {any[]}*/
    let data = [];

    /**@type {Promise<any[]>}*/
    let incoming = new Promise(() => null);

    let offset = 0,
        step = 20;

    /**@type {any} NodeJS.timeout | null | 0*/
    let timeout = 0;

    $: {
        [words, city, dept];
        browser && T();
    }

    function T() {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(async () => {
            data = []; //replace data
            offset = 0;
            await get();
            timeout = null;
        }, 500);
    }

    onMount(() => {
        let observer = new IntersectionObserver(([el]) => {
            if (!el.isIntersecting) return;

            if (timeout === null) {
                get();
                offset += step;
            }
        });

        observer.observe(
            //@ts-ignore
            document.getElementById("end"),
        );
    });

    function get() {
        incoming = new Promise(async (res, rej) => {
            let d = supabase.from(table).select();

            if (city) d = d.eq("city", city);
            if (dept) d = d.eq("dept", dept);
            
            if (words.length > 0) {
                if (table === "profiles") {
                    d = d.ilike("name", "%"+words+"%");
                } else if (table === "reports") {
                    let q = words.split(/\s+/).filter(Boolean).map(w => `'${w}'`).join(" | "); //PGSQL any word search
                    d = d.textSearch("title", q);
                }
            }

            let q = await d.range(offset, offset + step);

            console.log("Response:", q);

            if (q.error) rej(q.error.message);
            else if (q.data.length === 0) res([]);
            else res(q.data);
        });

        incoming
            .then((records) => {
                data = data.concat(records);
            })
            .catch((e) => {
                console.error(e);
            });
    }
</script>

<div class="box">
    {#key [words, city, dept]}
        {#each data as r}
            <svelte:component this={component} {r} />
        {/each}
    {/key}

    {#await incoming}
        <Loading label={table} />
    {:then}
        {#if data.length === 0 }
            <p> No {table} found for the given filter </p>
        {/if}
    {:catch e}
        Failed to get {table}: <small>{e}</small>
    {/await}

    <div id="end"></div>
</div>

<style>
    .box {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
        padding-bottom: 0;
        width: 40rem;
        height: 100%;
        overflow-y: auto;
    }

    @media (max-width: 556px) {
        .box {
            width: 100%;
            padding: 1rem;
        }
    }

    #end {
        padding-top: 4rem;
        width: 100%;
    }

    .box::-webkit-scrollbar {
        display: none;
        appearance: none;
    }
</style>
