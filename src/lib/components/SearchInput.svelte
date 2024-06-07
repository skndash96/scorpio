<script>
    export let
        /**@type {string}*/ query,
        /**@type {string}*/ label,
        /**@type {boolean}*/ fast = false;

    const TIME = fast ? 250 : 500;

    let val = "";

    /**@type {NodeJS.Timeout|null}*/
    let tm = null;

    $: [val, T()];

    function T() {
        if (tm) clearTimeout(tm);

        tm = setTimeout(() => {
            query = val;
        }, TIME);
    }

    /**
     * @param {KeyboardEvent} event
     */
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault();

            let d =
                //@ts-ignore
                event.target.parentElement.parentElement.querySelector(
                    "li.show",
                );

            if (d) d.firstChild.click();

            //@ts-ignore
            event.target.blur();
        } else if (event.key === "Escape") {
            //@ts-ignore
            event.target.blur();
        }
    }
</script>

<div class="search">
    <span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
            ><path
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            /></svg
        >
    </span>
    <input
        name={label}
        bind:value={val}
        type="search"
        on:keydown={handleKeyDown}
        autocomplete="off"
        placeholder={"Search for " + label}
    />
</div>

<style>
    div.search {
        position: relative;
    }
    
    input {
        flex-shrink: 1;
        padding-left: 2rem;
        width: 100%;
        border: none;
    }
    
    span {
        position: absolute;
        left: 0.5rem;
        top: 0.5rem;
        width: 1rem;
        height: 1rem;
        opacity: .8;
    }
</style>
