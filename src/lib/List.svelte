<script>
    import { onMount } from "svelte";
    import supabase from "./supabase";

    export let /**@type {string}*/ table,
        /**@type {string|null}*/ city,
        /**@type {string|null}*/ dept,
        component;

    /**@type {any[]}*/
    let data = [];

    /**@type {Promise<any[]>}*/
    let incoming = new Promise(() => null);

    let offset = 0,
        step = 20;

    onMount(() => {
        get();
        let observer = new IntersectionObserver(([el]) => {
            if (!el.isIntersecting) return;

            offset += step;
            get();
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

            let q = await d.range(offset, offset + step);

            console.log("RESPONSE:", q);

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
    {#each data as r}
        <svelte:component this={component} {r} />
    {/each}

    {#await incoming}
        <p class="icon">
            <span class="spin">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
            </span>
            <span>
                Loading {table}
            </span>
        </p>
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
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
        width: 40rem;
        height: 100%;
        overflow-y: auto;
    }
    @media (max-width: 556px) {
        .box {
            width: 100%;
        }
    }

    #end {
        padding: 1rem;
        position: absolute;
        bottom: 0;
    }

    .box::-webkit-scrollbar {
        display: none;
        appearance: none;
    }

    .spin {
        display: inline-block;
        margin-top: .5rem;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        } to {
            transform: rotate(360deg);
        }
    }
</style>
