<script>
    import supabase from "$lib/supabase";
    import { showToast } from "$lib/utils";

    export let
        /**@type {import("@supabase/supabase-js").User}*/ user;

    let msg = "";
    /**
     * @param {MouseEvent} event
    */
    async function signOut(event) {
        msg = "Loading";

        let { error } = await supabase.auth.signOut();

        msg = "Signing out";

        if (error) {
            console.error(error.message);
            showToast("Failed to  signout");
    
            msg = "Sign out";
        } else {
            msg = "Signed out";
        }
    }
</script>

<div>
    <span class="icon">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
        </span>
        <span>
            {user.user_metadata.username || "Account"}
        </span>
        <span>
            <span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg> </span>
        </span>
    </span>

    <menu>
        <li>
            <button class="minimal" on:click={signOut}>
                {msg || "Signout"}
            </button>
        </li>
    </menu>
</div>

<style>
    div {
        position: relative;
        height: 100%;
        z-index: 9;
    }

    .icon {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 100%;
        gap: .2rem;
        border-bottom: 2px solid transparent;
    }

    menu {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        transform: translateY(100%);
        background: var(--elevate-dark);
        backdrop-filter: blur(4px);
        max-height: 0;
        overflow: hidden;
        transition: all 200ms ease-out;
    }

    .icon:hover + menu, menu:hover {
        max-height: 80vh;
    }

    menu li button {
        padding: .5rem;
        color: var(--text);
        width: 100%;
    }
    menu li button:hover {
        background: var(--elevate);
    }
</style>