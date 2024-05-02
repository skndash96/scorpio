<script>
    import SearchInput from "$lib/SearchInput.svelte";
    import "$lib/searchList.css";

    export let /**@type {string[]}*/ data,
        /**@type {number}*/ value,
        /**@type {string}*/ label;

    let query = "";
</script>

<fieldset class="search">
    <label for={label}>
        {label}:
        {#if value >= 0}
            <button class="minimal remove" on:click={() => (value = -1)}>
                {data[value]} <span>x</span>
            </button>
        {/if}
    </label>

    <SearchInput {label} bind:query />

    <ul>
        {#each data as d, i}
            <li class:show={d.toLowerCase().includes(query.toLowerCase())}>
                <button
                    on:click|preventDefault={() => {
                        value = i;
                        query = "";
                    }}
                >
                    {d}
                </button>
            </li>
        {/each}
    </ul>
</fieldset>

<style>
    .search li {
        display: none;
    }
    .search li.show {
        display: block;
    }
</style>
