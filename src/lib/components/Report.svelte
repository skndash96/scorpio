<script>
    import { formatTimestamp } from "$lib/utils";
    import Profile from "$lib/components/Profile.svelte";

    export let /**@type {ReportSchema}*/ r,
        /**@type {boolean}*/ hyperlink = true;

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

<div class="report" class:hyperlink>
    {#if hyperlink}
        <span style="font-size: 1.1rem; font-weight: 600;"> {r.title} </span>
    {:else}
        <h3 style="font-size: 600;"> {r.title} </h3>
    {/if}

    <div class="details">
        <span> {formatTimestamp(r.timestamp)} </span>
        <span> {r.dept} </span>
        <span> {r.city} </span>
    </div>

    <p>
        {#if hyperlink}
            {r.info.slice(0, 200)}
            {#if r.info.length > 200}
                <small style="opacity: .7;"> (read more) </small>
            {/if}
        {:else}
            <!--TODO: Sanitize input-->
            {@html formatInfo(r.info)}
        {/if}
    </p>

    {#if !hyperlink}
        {#if r.accountable}
            <p>
                <span>Accountable person:</span>
                <a href="profiles/{r.accountable.id}">
                    <Profile pf={r.accountable} compact={true} />
                </a>
            </p>
        {/if}
    {/if}
</div>

<style>
    .report {
        padding: 1rem;
        max-width: 52rem;
        margin: 0 auto;
    }

    .report.hyperlink {
        border: 2px solid var(--elevate);
        background-color: var(--elevate);
    }

    .report.hyperlink .details {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.5rem;
    }

    .report .details > * {
        padding: 0 0.5rem;
        border-right: 2px solid var(--primary);
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
