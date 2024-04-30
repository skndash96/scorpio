<script>
    /**@type {ReportSchema}*/
    export let r;

    import { formatTimestamp } from "./utils";
</script>

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

<style>
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
</style>