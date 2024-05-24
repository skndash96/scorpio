<script>
    import Profile from "$lib/components/Profile.svelte";
    import Report from "$lib/components/Report.svelte";

    export let data;

    /**@type {ProfileSchema}*/
    let pf = data.profile;
</script>

<svelte:head>
    <title>Scorpio | {pf.name}</title>
</svelte:head>

<main>
    <Profile data={pf} />
    
    <section id="related">
        <h4>Related reports:</h4>

        <ul>
            {#each pf.accountable as report}
                <li>
                    <a href="/reports/{report.id}">
                        <Report data={report} showMin elevate />
                    </a>
                </li>
            {/each}
        </ul>
    </section>
</main>

<style>
    main {
        padding: 2rem 1rem;
    }

    #related {
        margin-top: 2rem;
        width: fit-content;
    }

    #related li {
        margin-top: 1rem;
    }
</style>
