<script>
    import { letterOfName } from "./utils";

    export let
    /**@type {ProfileSchema}*/ r;
</script>

<div class="profile">
    <a href="/profiles/{r.id}">
        <div class="image">
            {#if r.image}
                <img src={r.image} alt={r.name} />
            {:else}
                <span>{letterOfName(r.name)}</span>
            {/if}
        </div>

        <span style="font-size: 1.1rem; font-weight: 600;">
            {r.name}
        </span><br />
    </a>
</div>

<style>
    .profile {
        padding: 1rem;
        border: 2px solid var(--elevate);
        background-color: var(--elevate);
    }

    .profile a {
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .profile a .image {
        width: 2rem;
        height: 2rem;
        display: grid;
        place-items: center;
        overflow: hidden;
        border-radius: 100%;
        background: var(--elevate-dark);
    }
</style>
