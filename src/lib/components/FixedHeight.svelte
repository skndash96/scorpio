<main class="fixed">
    <slot />
</main>

<style>
    @media (min-width: 556px) {
       :global(#wrapper:has(main.fixed)) {
            height: 100vh;
            height: 100dvh;
        }

        :global(main.fixed + footer) {
            display: none;
        }

        main.fixed {
            position: relative;
            display: flex;
            align-items: stretch;
            overflow: auto;
        }

        :global(main.fixed > *) {
           border-right: 2px solid var(--elevate-dark);
        }
    
        :global(main.fixed > *:last-child) {
            border-radius: none;
        }
    }
</style>