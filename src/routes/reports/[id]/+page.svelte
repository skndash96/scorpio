<script>
    import Report from "$lib/components/Report.svelte";

    export let data;

    /**@type {ReportSchema}*/
    let r = data.report;
</script>

<svelte:head>
    <title> Scorpio | View Report </title>
</svelte:head>

<main>
    <Report {r} hyperlink={false} />
</main>

<style>
</style>