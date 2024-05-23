<script>
    import { formatTimestamp, letterOfName } from "$lib/utils.js";

    export let data;

    /**@type {ProfileSchema}*/
    let p = data.profile;
</script>

<svelte:head>
    <title>Scorpio | {p.name}</title>
</svelte:head>

<main>
    <div class="box">
        <div class="image">
            {#if p.image}
                <img src={p.image} alt={p.name} width="150" height="150" />
            {:else}
                <span>{letterOfName(p.name)}</span>
            {/if}
        </div>

        <div class="info">
            <h2 class="name">{p.name}</h2>
            
            <small class="created">
                Created on: {formatTimestamp(p.created_at)}
            </small>
        </div>
    </div>

    <section>
        <h4>Related reports:</h4>
    </section>
</main>

<style>
    main {
        padding: 1rem;
    }

    .box {
        display: flex;
        gap: 1rem;
    }
    .image {
        background: var(--elevate-dark);
        border-radius: 100%;
        overflow: hidden;
        width: 4rem;
        height: 4rem;
        display: grid;
        place-items: center;
    }
    .image img {
        width: 100%;
        height: 100%;
    }

    .info {
        display: flex;
        flex-direction: column;
    }

    small.created {
        opacity: 0.9;
    }

    section {
        margin-top: 2rem;
    }
</style>
