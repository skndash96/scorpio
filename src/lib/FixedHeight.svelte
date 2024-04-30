<script>
    /**@type {string}*/
    export let id;
</script>

<main class="fixed" {id}>
    <slot />
</main>

<style>
    main {
        position: relative;
        display: flex;
        align-items: stretch;
        overflow: auto;
    }
    
    :global(#wrapper) {
        height: 100vh;
        height: 100dvh;
    }
    :global(footer) {
        display: none;
    }

    :global(main.fixed > *) {
        border-right: 2px solid var(--elevate-dark);
    }
    :global(main.fixed > *:last-child) {
        border-radius: none;
    }

    @media (max-width: 556px) {
        main {
            display: initial;
        }

        :global(main.fixed > *) {
            border: none !important;
        }
        
        :global(#wrapper) {
            height: unset;
        }
    }
</style>