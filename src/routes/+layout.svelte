<script>
    import "$lib/main.css";
    import Footer from "../lib/Footer.svelte";
    import Header from "../lib/Header.svelte";
</script>

<svelte:head>
    <meta name="title" content="Scorpio | Empowering Citizens " />
    <meta name="description" content="Empower citizens to voice their experiences with government officials. Rate and report on the performance of elected representatives, fostering accountability and transparency in governance" />
    <meta name="image" content="favicon.png" />
</svelte:head>

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