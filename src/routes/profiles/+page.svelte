<script>
    import FixedHeight from "$lib/FixedHeight.svelte";
import List from "$lib/List.svelte";
    import Profile from "$lib/Profile.svelte";
    import { cities, departments } from "$lib/report.js";
    import Search from "$lib/Search.svelte";
    import { preventFormEnter } from "$lib/utils";

    let /**@type {string}*/ name,
        city = -1,
        dept = -1;
</script>

<FixedHeight id="profileList">
    <form>
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

        <button type="submit"> Search </button>
    </form>

    {#key city+dept}
        <List table="profiles" component={Profile} bind:city={cities[city]} bind:dept={departments[dept]} />
    {/key}
</FixedHeight>

<style>
    form {
        max-width: 20rem;
        padding: 1rem;
        padding-right: 2rem;
        overflow: auto;
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

    form button[type="submit"] {
        margin: 1rem auto;
        display: block;
    }
</style>
