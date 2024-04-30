<script>
    import { onMount } from "svelte";
    import supabase from "./supabase";

    export let
    /**@type {string}*/ table,
    /**@type {string|null}*/ city,
    /**@type {string|null}*/ dept,
    component;

    /**@type {any[]}*/
    let data = [];

    /**@type {Promise<any[]>}*/
    let incoming = new Promise(() => null);

    let offset = 0, step = 20;

    onMount(() => {
        get();
        let observer = new IntersectionObserver(([el]) => {
            if (!el.isIntersecting) return;

            offset += step;
            get();
        });
    
        observer.observe(
            //@ts-ignore
            document.getElementById("end")
        );
    });
    
    function get() {
        incoming = new Promise(async (res, rej) => {
            let d = supabase
                .from(table)
                .select();
            
            if (city) d = d.eq("city", city);
            if (dept) d = d.eq("dept", dept);
            
            //@ts-ignore
            d = await d.range(offset, offset + step);

            console.log("RESPONSE:", d);

            //@ts-ignore
            if (d.error) rej(d.error.message);
            //@ts-ignore
            else if (d.data.length === 0) res([])
            //@ts-ignore
            else res(d.data);
        });

        incoming
        .then(records => {
            data = data.concat(records);
        })
        .catch(e => {
            console.error(e);
        });
    }
</script>

<div class="reportBox">    
    {#if data.length === 0}
    <p> No reports found for the given filter. </p>
    {/if}

    {#each data as r}
    <svelte:component this={component} {r} />
    {/each}
    
    {#await incoming}
        Loading reports
    {:catch e}
        Failed to get reports: <small>{e}</small>
    {/await}

    <div id="end"></div>
</div>

<style>
    .reportBox {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
        width: 40rem;
        height: 100%;
        overflow-y: auto;
    }
    @media (max-width: 556px) {
        .reportBox {
            width: 100%;
        }
    }

    #end {
        padding: 1rem;
        position: absolute;
        bottom: 0;
    }

    .reportBox::-webkit-scrollbar {
        display: none;
        appearance: none;
    }
</style>
