<script>
    import { onMount } from "svelte";
    import supabase from "./supabase";
    import { formatTimestamp } from "./utils";

    export let title;

    /**@type {ReportSchema[]}*/
    let data = [];

    /**@type {Promise<ReportSchema[]>}*/
    let incoming = new Promise(r => r([]));

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
            let d = await supabase
                .from("reports")
                .select("*")
                .range(offset, offset + step);

            console.log("RESPONSE:", d);

            if (d.error) rej(d.error.message);
            else if (d.data.length === 0) res([])
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
    <h4 class="title">{title}</h4>
    
    {#each data.concat(data).concat(data).concat(data) as r}
        <div class="report">
            <a href="/reports/{r.id}">
                <span style="font-size: 1.1rem; font-weight: 600;">
                    {r.title}
                </span><br />
    
                <div class="details">    
                    <span class="time">
                        {formatTimestamp(r.timestamp)}
                    </span>
                    <span class="dept">
                        {r.dept}
                    </span>
                    <span class="city">
                        {r.city}
                    </span> 
                </div>
    
                <p>
                    {r.info.slice(0, 200)}
                    {#if r.info.length > 200}
                        <span class="readmore"> (read more) </span>
                    {/if}
                </p>
            </a>
        </div>
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
        max-width: 52rem;
        min-width: 20rem;
        padding: 2rem;
        overflow-y: auto;
        height: 100%;
        border: 2px solid var(--elevate-dark);
        border-top: none;
        border-bottom: none;
    }
    .reportBox .title {
        font-weight: 500;
        text-align: center;
    }

    .report {
        padding: 1rem;
        border: 2px solid var(--elevate);
        background-color: var(--elevate);
    }

    .report .details {
        display: flex;
        flex-wrap: wrap;
        margin-top: .5rem;
    }
    .report .details > * {
        padding: 0 .5rem;
        border-right: 2px solid var(--primary);
        font-size: .9rem;
        opacity: .9;
    }
    .report .details > *:last-child {
        border-right: none;
    }

    .report a {
        text-decoration: none;
    }

    .report p {
        margin-top: 0.5rem;
        padding-top: 1rem;
        border-top: 1px solid var(--elevate);
    }

    .report .readmore {
        opacity: 0.6;
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
