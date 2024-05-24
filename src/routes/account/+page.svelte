<script>
    import supabase from "$lib/supabase";
    import userStore from "$lib/userStore";
    import { showToast } from "$lib/utils";

    /**@type {import("@supabase/supabase-js").User | null}*/
    let user;
    userStore.subscribe((u) => (user = u));

    async function handleSignout() {
        let { error } = await supabase.auth.signOut();

        if (error) {
            console.error(error);
            showToast("Failed to Sign out");
        } else {
            showToast("Signed out", "good");
        }
    }
</script>

<main>
    {#if user}
        <div>
            <strong> Username: </strong>
            <span> {user?.user_metadata.username} </span>
        </div>

        <br />

        <button on:click={handleSignout}> Sign out </button>
    {:else}
        <a href="/auth"> Sign up / Login </a>
    {/if}
</main>

<style>
    main {
        padding: 2rem;
    }

    main > a {
        text-decoration: underline;
    }
</style>
