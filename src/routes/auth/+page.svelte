<script>
    import { page } from "$app/stores";
    import supabase from "$lib/supabase";
    import { showToast } from "$lib/utils";

    let
    /**@type {string} */ username = "",
    /**@type {string} */ email = "",
    /**@type {string} */ password = "",
    loading = false;
    
    let isSignup = $page.url.searchParams.get("signUp") || true;

    async function handleAuth() {
        if (!email.trim() || !/^.+\@.+\..+$/.test(email)) {
            return showToast("Invalid email");
        } else if (!password.trim() || (isSignup && password.length < 8)) {
            return showToast("Password too short");
        } else if (isSignup && username.length < 4) {
            return showToast("Username too short");
        }

        let credentials = {
            email,
            password
        };

        loading = true;

        let { error } = isSignup
            ? await supabase.auth.signUp({
                ...credentials,
                options: { data: { username } }
            })
            : await supabase.auth.signInWithPassword(credentials);

        if (error) {
            showToast(error.message || `Failed to ${currentType()}`);
        } else {
            //TODO: verify email
            // Logged in. Toast shown by layout.js
        }

        loading = false;
    }

    function currentType(invert = false) {
        if (isSignup) {
            return invert ? "Login" : "Sign up";
        } else {
            return invert ? "Sign up" : "Login";
        }
    }

    function toggleSignup() {
        isSignup = !isSignup;
    }
</script>

<svelte:head>
    <title> Scorpio | Account </title>
</svelte:head>

<main>
    <form on:submit|preventDefault>
        <h3> {currentType()} </h3>

        {#if isSignup}
        <fieldset>
            <label for="username">Username:</label>
            <input name="username" bind:value={username} placeholder="johndoe07" type="text" />
        </fieldset>
        {/if}

        <fieldset>
            <label for="email">Email:</label>
            <input name="email" bind:value={email} placeholder="johndoe@gmail.com" type="text" />
        </fieldset>
        
        <fieldset>
            <label for="password">Password:</label>
            <input name="password" bind:value={password} placeholder="********" type="password" />
        </fieldset>

        <button on:click={handleAuth}>
            {currentType()}
        </button>

        <p>
            {#if isSignup}
            Have an account? <button class="minimal" on:click={toggleSignup}> Sign in </button>
            {:else}
            Create an account? <button class="minimal" on:click={toggleSignup}> Sign up </button>

            {/if}
        </p>       
    </form>
</main>

<style>
    main {
        display: grid;
        place-items: center;
        padding: 1rem;
    }

    form > * {
        margin-top: 1rem;
    }

    form h3, form > button {
        display: block;
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
    }

    form p {
        font-size: .9rem;
        opacity: .8;
    }
</style>