<script>
    import { browser } from "$app/environment";
    
    let isDark = true;

    if (browser) {
        isDark  = window.matchMedia("(prefers-color-scheme: dark)") ? true : false;
    }

    function toggleisDark() {
        isDark = !isDark;
        console.log(isDark);
        document.documentElement.classList[isDark ? "add" : "remove"]("dark");
    }

</script>

<header>
    <div class="brand">
        <h2>
            <a href="/">
                <span><img src="/favicon.png" alt="logo" width="20" height="20" /></span>
                <span>S</span>corpio
            </a>
        </h2>
    </div>

    <nav>
        <ul>
            <li>
                <a href="/" class="icon">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/></svg>
                    </span>
                    <span>About</span>
                </a>
            </li>
            <li>
                <a href="/" class="icon">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"/></svg>
                    </span>
                    <span>Statistics</span>
                </a>
            </li>
            <li>
                <a href="/" class="icon">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M352 224H305.5c-45 0-81.5 36.5-81.5 81.5c0 22.3 10.3 34.3 19.2 40.5c6.8 4.7 12.8 12 12.8 20.3c0 9.8-8 17.8-17.8 17.8h-2.5c-2.4 0-4.8-.4-7.1-1.4C210.8 374.8 128 333.4 128 240c0-79.5 64.5-144 144-144h80V34.7C352 15.5 367.5 0 386.7 0c8.6 0 16.8 3.2 23.2 8.9L548.1 133.3c7.6 6.8 11.9 16.5 11.9 26.7s-4.3 19.9-11.9 26.7l-139 125.1c-5.9 5.3-13.5 8.2-21.4 8.2H384c-17.7 0-32-14.3-32-32V224zM80 96c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16H400c8.8 0 16-7.2 16-16V384c0-17.7 14.3-32 32-32s32 14.3 32 32v48c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V112C0 67.8 35.8 32 80 32h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H80z"/></svg>
                    </span>
                    <span>Social</span>
                </a>
            </li>
        </ul>
    </nav>
</header>

<style>
    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
        padding: 0 1rem;
        border-bottom: 2px solid var(--elevate);
    }

    ul {
        display: flex;
        flex-direction: row;
        height: 100%;
        align-items: stretch;
    }
    li a {
        border-bottom: 3px solid transparent;
        transition: border 150ms ease-in-out;
        display: flex;
        align-items: center;
        padding: .5rem;
    }
    li a:hover {
        border-color: var(--primary);
    }
    
    li a > span:first-child {
        margin-right: .5rem;
    }
    @media (max-width: 556px) {
        li a > span:last-child {
            display: none;
        }
    }
    a {
        text-decoration: none;
    }
</style>