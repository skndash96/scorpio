<script>
    import { letterOfName } from "$lib/utils";

    export let /**@type {ProfileSchema}*/ r,
        compact = true;
</script>

<div class="profile" class:compact={compact}>
    <div class="image">
        {#if r.image}
            <img src={r.image} alt={r.name} width="50" height="50" />
        {:else}
            <span>{letterOfName(r.name)}</span>
        {/if}
    </div>

    <span style="font-weight: 600;">
        {r.name}
    </span><br />
</div>

<style>
    .profile {
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .profile.compact {
        border: 2px solid var(--elevate);
        background-color: var(--elevate);
    }

    .profile .image {
        width: 2rem;
        height: 2rem;
        display: grid;
        place-items: center;
        overflow: hidden;
        border-radius: 100%;
        background: var(--elevate-dark);
    }
</style>
