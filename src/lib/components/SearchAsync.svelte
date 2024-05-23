<script>
    import SearchInput from "$lib/components/SearchInput.svelte";
    import Loading from "./Loading.svelte";

    export let /**@type {function} returns Promise<any[]>**/ getData,
        /**@type {any|null} selected value of any[]*/ value,
        /**@type {string}*/ label;

    /**@type {Promise<any[]>}*/
    let data = new Promise(() => null);

    let query = "";

    $: {
        query;
        data = getData(query);
    }

    const display = (/** @type {any} */ item) => item.name;
</script>

<fieldset class="search">
    <label for={label}>
        {label}

        {#if value}
            <button class="minimal remove" on:click={() => (value = null)}>
                {display(value)} <span>x</span>
            </button>
        {/if}
    </label>

    <SearchInput {label} bind:query />

    <ul>
        {#await data}
            <Loading {label} />
        {:then data}
            {#if data.length === 0}
                <li> No {label} found </li>
            {/if}

            {#each data as item}
                <li class="show">
                    <button on:click={() => (value = item)}>
                        {display(item)}
                    </button>
                </li>
            {/each}
        {:catch error}
            Failed to find {label}: {error.message || error}
        {/await}
    </ul>
</fieldset>
