<script>
    import "./Search.css";
    import SearchInput from "./SearchInput.svelte";

    export let /**@type {string[]}*/ data,
        /**@type {string}*/ label,
        /**@type {string|null}*/ value;

    let query = "";
</script>

<fieldset class="searchField">
    <label>
        {label}

        {#if value}
            <button class="minimal remove" on:click={() => (value = null)}>
                {value} <span>x</span>
            </button>
        {/if}
    </label>
    
    <SearchInput {label} bind:query fast />

    <ul>
        {#each data as item}
            <li
                class:show={!query || item
                    .toLowerCase()
                    .includes(query.trim().toLowerCase())}
            >
                <button on:click={() => (value = item)}>
                    {item}
                </button>
            </li>
        {/each}

        {#if query.trim().length > 2}
            <li class="show">
                <button on:click={() => (value = query.trim())}>
                    {query.trim()}
                </button>
            </li>
        {/if}
    </ul>
</fieldset>

<style>
</style>
