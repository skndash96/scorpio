<script>
    import { formatTimestamp, letterOfName } from "$lib/utils";

    export let data;
    let p = data.profile;
</script>

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
            <h2 class="name"> {p.name} </h2>
            <small class="created"> Created on: {formatTimestamp(p.created_at)} </small>
        </div>
    </div>

    <section>
        <h3> Related reports: </h3>
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
        opacity: .9;
    }

    section {
        margin-top: 2rem;
    }
</style>
