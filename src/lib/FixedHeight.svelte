<script>
    /**@type {string}*/
    export let id;
</script>

<main class="fixed" {id}>
    <slot />
</main>

<style>
    main.fixed {
        position: relative;
        display: flex;
        align-items: stretch;
        overflow: auto;
    }
    
    :global(#wrapper:has(main.fixed)) {
        height: 100vh;
        height: 100dvh;
    }
    :global(main.fixed + footer) {
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
        
        :global(#wrapper:has(main.fixed)) {
            height: unset;
        }
    }
</style>