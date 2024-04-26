<script>
    import "$lib/main.css";
    import Footer from "../lib/Footer.svelte";
    import Header from "../lib/Header.svelte";
</script>

<div id="wrapper">
    <Header />
    <slot />
    <Footer />
</div>

<style>
    #wrapper {
        min-height: 100vh;
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
    }
    :global(#wrapper > main) {
        flex-grow: 1;
    }
</style>