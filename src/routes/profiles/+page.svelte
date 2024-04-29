<script>
    import { cities } from "$lib/report.js";
    import Search from "$lib/Search.svelte";

    let
    /**@type {string}*/ name,
    city = -1;
</script>

<main>
    <form>
        <h3> Search for an Official </h3>

        <fieldset>
            <label for="name"> Name: </label>
            <input name="name" bind:value={name} type="text" placeholder="name of the official" />
        </fieldset>

        <Search label="City" data={cities} bind:value={city} />
        
        <button type="submit">
            Search
        </button>
    </form>

    <section>
        <h3> High Rated Officials </h3>
        <p> TODO </p>
    </section>
</main>

<style>
    main {
        display: flex;
    }
    
    main > * {
        padding: 1rem;
    }

    form {
        max-width: 20rem;
        border-right: 2px solid var(--elevate-dark);
    }

    @media (max-width: 628px) {
        main {
            flex-direction: column;
        }
        form {
            width: fit-content;
            margin: 0 auto;
            border: none;
        }
    }

    form h3 {
        margin: 2rem 0;
        text-align: center;
    }

    form label {
        opacity: .9;
        margin-bottom: .5rem;
    }

    form > fieldset {
        display: flex;
        flex-direction: column;
    }

    form > * {
        margin-top: 1.5rem;
    }

    form button[type="submit"] {
        margin: 1rem auto;
        display: block;
    }

    section {
        opacity: .4;
    }
</style>