<script>
    import FixedHeight from "$lib/components/FixedHeight.svelte";
    import List from "$lib/components/List.svelte";
    import Profile from "$lib/components/Profile.svelte";
    import SearchInput from "$lib/components/SearchInput.svelte";
    import SearchStatic from "$lib/components/SearchStatic.svelte";
    import { cities, departments } from "$lib/utils";
    import "$lib/components/FilterAccordion.css";
    
    export let
        /**@type {string|null}*/ city,
        /**@type {string|null}*/ dept,
        /**@type {string}*/ words = "";
    
    let formOpen = false;
</script>

<svelte:head>
    <title> Scorpio | Search Officials of the World </title>
</svelte:head>

<FixedHeight>
    <div id="filters">
        <button class="formToggle icon" on:click={() => (formOpen = !formOpen)}>
            <span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg> </span>
            <span> Find Profiles </span>
        </button>
        
        <form on:submit|preventDefault class:open={formOpen}>
            <fieldset>
                <label for="name"> Name: </label>
                <SearchInput label="Person" bind:query={words} />
            </fieldset>
            
            <SearchStatic label="Department" data={departments} bind:value={dept} />
            <SearchStatic label="City" data={cities} bind:value={city} />
        </form>
    </div>
        
    <List table="profiles" component={Profile} bind:words bind:city={city} bind:dept={dept} />

    <section id="trending">
        Empty Section
    </section>
</FixedHeight>

<style>
    #filters {
        padding: 1rem 2rem 0 1rem;
        width: 20rem;
        overflow: auto;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    @media (max-width: 556px) {
        form {
            width: fit-content;
            margin: 0 auto;
            border: none;
        }
    }

    form label {
        opacity: 0.9;
        margin-bottom: 0.5rem;
    }

    form > fieldset {
        display: flex;
        flex-direction: column;
    }

    #trending {
        flex-grow: 1;
        padding: 1rem;
        opacity: .5;
    }

    @media (max-width: 928px) {
        #trending {
            display: none;
        }
    }
</style>
