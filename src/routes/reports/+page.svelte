<script>
    import FixedHeight from "$lib/components/FixedHeight.svelte";
    import SearchStatic from "$lib/components/SearchStatic.svelte";
    import { cities, departments } from "$lib/utils";
    import "$lib/components/FilterAccordion.css";
    import List from "$lib/components/List.svelte";
    import Report from "$lib/components/Report.svelte";
    import SearchInput from "$lib/components/SearchInput.svelte";

    let /**@type {string|null}*/ city = null,
        /**@type {string|null}*/ dept = null,
        /**@type {string}*/ words = "";

    let formOpen = false;
</script>

<svelte:head>
    <title>Scorpio | Search Reports from the World</title>
</svelte:head>

<FixedHeight>
    <section id="filters">
        <button class="formToggle icon" on:click={() => (formOpen = !formOpen)}>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
            </span>
            <span> Find Reports </span>
        </button>

        <form class:open={formOpen} on:submit|preventDefault>
            <fieldset>
                <label for="words"> Words: </label>
                <SearchInput bind:query={words} label="words" />
            </fieldset>

            <SearchStatic label="Department" data={departments} bind:value={dept} />
            <SearchStatic label="City" data={cities} bind:value={city} />
        </form>
    </section>

    <List bind:city bind:dept bind:words table="reports" component={Report}/>

    <section id="trending">
        Empty section
    </section>
</FixedHeight>

<style>    
    /* Filter responsive CSS imported */
    
    label {
        margin-bottom: 0.5rem;
        opacity: .9;
    }

    #trending {
        flex-grow: 1;
        padding: 1rem;
        opacity: 0.5;
    }

    @media (max-width: 928px) {
        #trending {
            display: none;
        }
    }
</style>