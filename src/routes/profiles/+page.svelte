<script>
    import FixedHeight from "$lib/FixedHeight.svelte";
    import List from "$lib/List.svelte";
    import Profile from "$lib/Profile.svelte";
    import { cities, departments } from "$lib/report.js";
    import Search from "$lib/Search.svelte";
    import { preventFormEnter } from "$lib/utils";
    import "$lib/filterAccordion.css";

    let /**@type {string}*/ name,
        city = -1,
        dept = -1,
        formOpen = false;
</script>

<FixedHeight id="profileList">
    <div class="formBox">
        <button class="formToggle icon" on:click={() => (formOpen = !formOpen)}>
            <span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg> </span>
            <span> Find Profiles </span>
        </button>
        
        <form on:submit|preventDefault class:open={formOpen}>
            <fieldset>
                <label for="name"> Name: </label>
                <input
                name="name"
                bind:value={name}
                type="text"
                placeholder="name of the official"
                on:keydown={preventFormEnter}
                disabled
                />
            </fieldset>
            
            <Search label="Department" data={departments} bind:value={dept} />
            <Search label="City" data={cities} bind:value={city} />
        </form>
    </div>
        
    {#key city+dept}
        <List table="profiles" component={Profile} bind:city={cities[city]} bind:dept={departments[dept]} />
    {/key}
</FixedHeight>

<style>
    .formBox {
        padding: 1rem 2rem 0 1rem;
        max-width: 20rem;
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
</style>
