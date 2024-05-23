<script>
    import { onMount } from "svelte";
    import Loading from "./Loading.svelte";
    import { get_current_component } from "svelte/internal";

    export let
        /**@type {string}*/ msg,
        /**@type {"good"|"bad"|"ok"}*/ stat;

    const Toast = get_current_component();

    /**@type {Element}*/
    let div;

    let intro = 0, outro = 0;
    
    /**@type {NodeJS.Timeout | undefined}*/
    let timer;
 
    onMount(() => {
        let obs = new IntersectionObserver(() => {
            intro = 1;
            obs.disconnect();
        });
        obs.observe(div);

        timer = setTimeout(destroy, 5000);
    });

    function destroy() {
        if (timer) clearTimeout(timer);

        outro = 1; //200ms transition
        setTimeout(() => Toast.$destroy(), 200);
    }
</script>

<div
    class={`${stat} toast ${intro ? "intro" : ""} ${outro ? "outro" : ""}`}
    bind:this={div}
>
    <p>
        {#if msg.startsWith("loading")}
            <Loading label={msg.split(/\s+/).slice(1).join(" ")} />
        {:else}
            {msg}
        {/if}
    </p>

    <button class="minimal" on:click={destroy}>
        Dismiss
    </button>
</div>

<style>
    .toast {
        padding: .5rem;
        background: var(--bg);
        font-size: .9rem;
        transition: all 200ms ease-out;
        transform: translate(-20px, -20px);
        opacity: .2;
        background: var(--elevate-solid);
        min-width: 10rem;
    }
    
    .bad {
        background-color: crimson;
    }
    
    .good {
        background-color: green;
    }
    
    .intro {
        opacity: 1;
        transform: none;
    }
    .outro {
        opacity: 0;
    } 

    button {
        display: block;
        color: var(--text);
        text-decoration: underline;
    }
</style>