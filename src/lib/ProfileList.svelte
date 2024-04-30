<script>
    import { onMount } from "svelte";
    import supabase from "./supabase";

    export let
    /**@type {string|null}*/ city,
    /**@type {string|null}*/ dept;

    /**@type {ProfileSchema[]}*/
    let data = [];

    /**@type {Promise<ProfileSchema[]>}*/
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
                .from("profiles")
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

<div class="profileBox">    
    {#if data.length === 0}
    <p> No profile found for the given filter. </p>
    {/if}

    {#each data as r}
        <div class="profile">
            <a href="/profiles/{r.id}">
                <div class="image">
                </div>

                <span style="font-size: 1.1rem; font-weight: 600;">
                    {r.name}
                </span><br />
            </a>
        </div>
    {/each}
    
    {#await incoming}
        Loading profiles
    {:catch e}
        <p>
            Failed to get profiles: <small>{e}</small>
        </p>
    {/await}

    <div id="end"></div>
</div>

<style>
    .profileBox {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 40rem;
        padding: 2rem;
        overflow-y: auto;
        height: 100%;
        border: 2px solid var(--elevate-dark);
        border-top: none;
        border-bottom: none;
    }
    @media (max-width: 556px) {
        .profileBox {
            width: 100%;
        }
    }

    #end {
        padding: 1rem;
        position: absolute;
        bottom: 0;
    }

    .profileBox::-webkit-scrollbar {
        display: none;
        appearance: none;
    }
</style>
