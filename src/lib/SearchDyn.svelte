<script>
    import Loading from "$lib/Loading.svelte";
    import SearchInput from "$lib/SearchInput.svelte";
    import "$lib/searchList.css";
    import { onMount } from "svelte";

    export let
    /**@type {string}*/ label,
    /**@type {any|null}*/ value,
    /**@type {function}*/ get;

    /**@type {Promise<any[]>}*/
    let data = new Promise((r) => r([]));

    let query = "";

    $: {
        query;
        data = get(query);
    };
    
    /**
     * @param {any} d
     */
    function setSelected(d) {
        value = d;
        query = "";
    }
    function rmSelected() {
        value = null;
        query = "";
    }
</script>

<div class="search">
    <label for={label}>
        {label}
        {#if value}
        <button class="minimal remove" on:click={rmSelected}>
            {value.name} <span>x</span>
        </button>
        {/if}
    </label>

    <SearchInput {label} bind:query />

    <ul>
        {#await data}
            <Loading {label} />
        {:then data}
            {#if query && data.length === 0}
                <li>
                    No profiles found
                </li>
            {/if}

            {#each data as d}
                <li>
                    <button on:click={() => setSelected(d)}>
                        {d.name}
                    </button>
                </li>
            {/each}
        {:catch e}
            Failed to get {label}: {e.message || e}
        {/await}
    </ul>
</div>
