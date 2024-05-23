<script>
    import "$lib/main.css";
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import supabase from "$lib/supabase";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { showToast } from "$lib/utils";

    /**@type {import("@supabase/supabase-js").User | undefined}*/
    let user;

    let suggestSignup = true;

    onMount(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            user = session?.user;

            if (user && $page.url.pathname === "/auth") {
                showToast("Logged in", "good");
                goto("/");
            } else if (!user && suggestSignup) {
                showToast("Create an account to get started", "ok");
                suggestSignup = false;
            }
        });
    });
</script>

<div id="wrapper">
    <Header {user} />
    
    <div id="toasts"></div>

    <slot />

    <Footer />
</div>

<style>
    #wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        min-height: 100dvh;
    }

    #toasts {
        position: fixed;
        top: 4rem;
        right: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        z-index: 10;
    }

    :global(#wrapper > main) {
        flex-grow: 1;
        position: relative;
    }
</style>