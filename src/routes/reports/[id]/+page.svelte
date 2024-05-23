<script>
    import Report from "$lib/components/Report.svelte";

    export let data;

    /**@type {ReportSchema}*/
    let r = data.report;
</script>

<main>
    <Report {r} hyperlink={false} />
</main>

<style>
</style>