<main>
    <div class="hero">
        <div class="image">
            <img src="/profile.png" alt="profile hero" width="150" height="150" />
        </div>
        <div class="text">
            <span> Empowering Citizens </span> <br/>
            <span> Your voice, your Impact </span>
        </div>
    </div>

    <div class="usage">
        <div>
            <h4> Paid a Bribe? </h4>
            <p> Write a report and share it to the world. Let people know the bad guys. A name and an address is all you need to make people aware. </p>
        </div>
        <div>
            <h4> Rate Officials </h4>
            <p> Based on your experience, rate the government official who ruined your day or made your day easier. </p>
        </div>
        <div>
            <h4> Find Good guys </h4>
            <p> Search for an official and look at their integrity ratings. We honour the honest government officials. </p>
        </div>
    </div>

    <div class="action">
        <a href="/write"> Write a Report </a>
        <a href="/reports"> View Reports </a>
        <a href="/profiles"> Search Officials </a>
    </div>
</main>

<style>
    main {
        padding: 0 1rem;
    }

    .hero {
        width: 100%;
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        width: fit-content;
        margin: 0 auto;
    }
    .hero .image {
        flex-shrink: 1;
    }
    .hero .image img {
        width: 100%;
    }
    .hero .text {
        width: max-content;
        font-size: clamp(1rem, 4vw, 1.4rem);
        font-weight: 600;
    }
    .hero span:last-child {
        color: var(--primary);
    }
    
    .usage {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: stretch;
        width: fit-content;
        margin: 0 auto;
        margin-top: 2rem;
        gap: 1rem;
    }
    .usage > div {
        max-width: 20rem;
        background: var(--elevate);
        padding: 1rem;
        border-radius: 1rem;
        margin: 0 auto;
    }
    .usage h4 {
        margin-bottom: 1rem;
    }

    .action {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        width: fit-content;
        margin: 2rem auto;
    }
    .action a {
        padding: .5rem;
        border: 2px solid var(--secondary);
        margin: 0 auto;
        border-radius: .2rem;
    }
    .action a:hover {
        text-decoration: underline;
    }
</style>