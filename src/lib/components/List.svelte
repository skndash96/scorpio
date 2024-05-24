<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import Loading from "./Loading.svelte";
    import supabase from "$lib/supabase";

    export let /**@type {"profiles"|"reports"}*/ table,
        /**@type {string|null}*/ city,
        /**@type {string|null}*/ dept,
        /**@type {string}*/ words,
        component;

    /**@type {any[]}*/
    let data = [];

    /**@type {Promise<any[]>}*/
    let incoming = new Promise(() => null);

    let offset = 0,
        step = 20;

    //CONFLICT, when filter applied get() is called. this also triggers intersection observer for end of page. How to fix?
    //Problem: get() called twice
    //Fix: 
    $: {
        [words, city, dept];
        browser && T();
    }

    async function T() {
        observeEnd = false;

        data = []; //replace data
        offset = 0;
        await get();

        observeEnd = true;
    }

    let observeEnd = false;

    onMount(() => {
        let observer = new IntersectionObserver(([el]) => {
            if (observeEnd && el.isIntersecting) get()
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
                    d = d.textSearch("title", q); //TODO: Search in description
                }
            }

            let q = await d.range(offset, offset + step);

            console.log(table, q);

            if (q.error) rej(q.error.message);
            else if (q.data.length === 0) res([]);
            else res(q.data);
        });

        incoming
            .then((records) => {
                data = data.concat(records);
                offset += step;
            })
            .catch((e) => {
                console.error(e);
            });
        
        return incoming;
    }
</script>

<div class="box">
    {#each data as record}
        <a href="{table}/{record.id}"> <!-- makesure this link works -->
            <svelte:component this={component} data={record} showMin elevate />
        </a>
    {/each}
    
    <div id="end">
        {#await incoming}
            <Loading label={table} />
        {:then}
            {#if data.length === 0 }
                <p> No {table} found for the given filter </p>
            {/if}
        {:catch e}
            Failed to get {table}: <small>{e}</small>
        {/await}
    </div>
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
        overflow: auto;
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
