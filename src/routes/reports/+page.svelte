<script>
    import List from "$lib/List.svelte";
    import Report from "$lib/Report.svelte";
    import Fixedheight from "$lib/FixedHeight.svelte";
    import Search from "$lib/Search.svelte";
    import { cities, departments } from "$lib/report";
    import { preventFormEnter } from "$lib/utils";
    import "$lib/filterAccordion.css";

    let /**@type {number}*/city = -1,
        /**@type {number}*/dept = -1,
        /**@type {string}*/words = "";
    
    let formOpen = false;
</script>

<Fixedheight id="reportList">
    <div class="formBox">
    <button class="formToggle icon" on:click={() => (formOpen = !formOpen)}>
        <span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg> </span>
        <span> Find Reports </span>
    </button>

    <form class:open={formOpen} on:submit|preventDefault>
        <fieldset>
            <label for="words">
                Words:
            </label>
            <input name="words" bind:value={words} type="text" placeholder="Look for words" on:keydown={preventFormEnter} />
        </fieldset>
        
        <Search label="Department" data={departments} bind:value={dept} />
        <Search label="City" data={cities} bind:value={city} />
    </form>
    </div>
    
    <List table="reports" component={Report} bind:words bind:city={cities[city]} bind:dept={departments[dept]} />
    
    <section>
        Empty section
    </section>
</Fixedheight>

<style>    
    .formBox {
        padding: 1rem 2rem 0 1rem;
        max-width: 20rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
    }

    label {
        margin-bottom: .5rem;
    }

    form input {
        width: 100%;
    }

    section {
        flex-grow: 1;
        padding: 1rem;
        opacity: .5;
    }
    @media (max-width: 928px) {
        section {
            display: none;
        }
    }
</style>
