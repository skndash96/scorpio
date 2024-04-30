<script>
    export let
    /**@type {string[]}*/data,
    /**@type {number}*/value,
    /**@type {string}*/label;

    let query = "";

    /**
     * @param {KeyboardEvent} event
     */
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault();

            //@ts-ignore
            let d = event.target.parentElement.parentElement.querySelector("li.show");

            if (d) d.firstChild.click();
        }
    }
</script>

<fieldset class="search">
    <label for={label}>
        {label}:
        {#if value >= 0}
            <button class="remove" on:click={() => (value=-1)}>
                {data[value]} <span style="color:crimson;">x</span>
            </button>
        {/if}
    </label>

    <div class="input">
        <span class="searchicon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        </span>

        <input
            type="search"
            name={label}
            bind:value={query}
            on:keydown={handleKeyDown}
            placeholder="Search"
        />
    </div>

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
    .search {
        position: relative;
        width: 100%;
    }
    .search ul {
        max-height: 10rem;
        overflow-y: auto;
        background: var(--elevate);
    }

    .search button.remove {
        background: none;
        padding: 0;
        margin: 0;
        border: 0;
        color: var(--quadernary);
    }

    .searchicon {
        position: absolute;
        left: 0.5rem;
        width: 1rem;
        top: 0.5rem;
        height: 1rem;
    }

    div.input {
        position: relative;
    }
    
    input {
        width: 100%;
        padding-left: 2rem;
    }

    li button {
        width: 100%;
        text-align: left;
        border: none;
        border-bottom: 1px solid var(--elevate);
        background-color: transparent;
    }
    li {
        display: none;
    }
    li:first-child {
        border-top: 1px solid var(--elevate);
    }
    li:hover button {
        background: var(--elevate);
    }
    li.show {
        display: block;
    }
</style>
