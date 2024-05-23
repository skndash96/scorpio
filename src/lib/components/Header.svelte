<script>
    import { browser } from "$app/environment";
    import HeaderAccountMenu from "$lib/components/HeaderAccountMenu.svelte";

    /**@type {import("@supabase/supabase-js").User | undefined}*/
    export let user;

    let isDark = true;
    
    if (browser) {
        isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
</script>

<header>
    <div class="brand">
        <h2>
            <a href="/">
                <span
                    ><img
                        src="/favicon.png"
                        alt="logo"
                        width="20"
                        height="20"
                    /></span
                >
                Scorpio
            </a>
        </h2>
    </div>

    <nav>
        <ul>
            <li>
                <a href="/" class="icon">
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 192 512"
                            ><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
                                d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"
                            /></svg
                        >
                    </span>
                    <span>About</span>
                </a>
            </li>
            <li>
                <a href="/" class="icon">
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            ><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
                                d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"
                            /></svg
                        >
                    </span>
                    <span>Statistics</span>
                </a>
            </li>
            <li>
                {#if user}
                    <HeaderAccountMenu {user} />
                {:else}
                    <a href="/auth" class="icon">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                        </span>
                        <span>Signup</span>
                    </a>
                {/if}
            </li>
        </ul>
    </nav>
</header>

<style>
    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
        border-bottom: 2px solid var(--elevate-dark);
    }

    .brand {
        transform: translateY(0.1rem);
        padding-left: 1rem;
    }

    nav ul {
        display: flex;
        flex-direction: row;
        height: 100%;
        align-items: stretch;
    }

    :global(header nav ul li:last-child > *:first-child) {
        padding-right: 1rem;
    }

    nav a {
        border-bottom: 2px solid transparent;
        transition: border 150ms ease-in-out;
        padding: 0.5rem;
        display: flex;
        align-items: center;
    }
    nav a:hover {
        border-color: var(--primary);
    }

    nav a span:first-child {
        margin-right: 0.5rem;
    }
    @media (max-width: 556px) {
        nav a span:last-child {
            display: none;
        }
    }

    a {
        text-decoration: none;
    }
</style>
