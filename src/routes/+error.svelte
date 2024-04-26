<script>
    import { page } from '$app/stores';
</script>

<main>
    <div>
        <h2> {$page.status}  </h2>
        <span> {$page.error.message} </span>
    </div>
</main>

<style>
    main {
        padding: 2rem;
        display: grid;
        place-items: center;
    }
    
    div {
        border: 2px solid var(--elevate);
        padding: 1rem;
    }
    
    h2 {
        font-weight: 600;
    }
</style>