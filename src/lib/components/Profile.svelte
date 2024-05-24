<script>
    import { letterOfName } from "$lib/utils";

    export let /**@type {ProfileSchema}*/ data,
        elevate = false,
        showMin = false;

    let pf = data;
</script>

<div class="profile" class:elevate>
    <div class="image" class:small={showMin}>
        {#if pf.image}
            <img src={pf.image} alt={pf.name} width="50" height="50" />
        {:else}
            <span>{letterOfName(pf.name)}</span>
        {/if}
    </div>

    <div>
        {#if showMin}
            <span style="font-weight: 600;">
                {pf.name}
            </span>
        {:else}
            <h3>{pf.name}</h3>

            <div class="integrity icon">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                </div>
                
                <div>
                    <strong style="font-size: 1.2rem"> {pf.integrity} </strong>
                    <small> /10 </small>
                    <small style="margin-left: .5rem;"> ({pf.totalRatings} ratings) </small>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .profile {
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .profile.elevate {
        border: 2px solid var(--elevate);
        background-color: var(--elevate);
    }

    .image {
        width: 5rem;
        aspect-ratio: 1/1;
        display: grid;
        place-items: center;
        overflow: hidden;
        border-radius: 100%;
        background: var(--elevate-dark);
        font-size: 2rem;
    }

    .image.small {
        width: 2rem;
        font-size: 1rem;
    }

    .integrity {
        display: flex;
        align-items: center;
        gap: .5rem;
    }

    .integrity svg {
        fill: var(--primary);
        width: 2rem;
        height: 2rem;
    }
</style>
