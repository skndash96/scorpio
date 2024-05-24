<script>
    import { formatTimestamp } from "$lib/utils";
    import Profile from "$lib/components/Profile.svelte";

    export let /**@type {ReportSchema}*/ data,
        /**@type {boolean}*/ showMin = false,
        /**@type {boolean}*/ elevate = false;

    let r = data;
    
    /**
     * @param {string} s
     * @returns {string}
     */
    function formatInfo(s) {
        return s
            .replaceAll("\n", "<br/>")
            .replaceAll(/\*\*(.+?)\*\*/g, "<strong> $1 </strong>") //bold
            .replaceAll(/\_(.+?)\_/g, "<underline> $1 </underline>") //underline
            .replaceAll(/\*(.+?)\*/g, "<i> $1 </i>"); //italics
    }
</script>

<div class="report" class:elevate={elevate}>
    <span style="font-size: 1.2rem; font-weight: 600;"> {r.title} </span>

    <div class="details">
        <span> {formatTimestamp(r.timestamp)} </span>
        <span> {r.dept} </span>
        <span> {r.city} </span>
    </div>

    <p>
        {#if showMin}
            {r.info.slice(0, 200)}
            {#if r.info.length > 200}
                <small style="opacity: .7;"> (read more) </small>
            {/if}
        {:else}
            <!--TODO: Sanitize input-->
            {@html formatInfo(r.info)}
        {/if}
    </p>

    {#if !showMin && r.accountable}
        <p>
            <span>Accountable person:</span>
            <a href="profiles/{r.accountable.id}">
                <Profile data={r.accountable} showMin elevate />
            </a>
        </p>
    {/if}
</div>

<style>
    .report {
        padding: 1rem;
        max-width: 52rem;
        margin: 0 auto;
    }

    .report.elevate {
        border: 2px solid var(--elevate);
        background-color: var(--elevate);
    }

    .report .details {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.5rem;
    }

    .report .details > * {
        padding: 0 0.5rem;
        border-right: 2px solid var(--txt);
        font-size: 0.9rem;
        opacity: 0.9;
    }
    .report .details > *:last-child {
        border-right: none;
    }

    .report p {
        margin-top: 0.5rem;
        padding-top: 1rem;
        border-top: 1px solid var(--elevate);
    }
</style>
