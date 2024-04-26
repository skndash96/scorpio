<script>
    let records = [
        {
            id: "id",
            title: "My life is ruined by a cop",
            description:
                "This is a sample text and I have no idea what to put in here. The title is fake and does not mean anything but to catch the eyes of the viewers. So what you can do is ignore this piece of writing and read something else useful.\n. Because I don't want you in here.",
            address:
                "B2 Police Station, Liberty Avenue, Karamadai, Chennai - 636001",
            time: "23 April, 2024",
        },
        {
            id: "id",
            title: "My life is ruined by a cop",
            description:
                "This is a sample text and I have no idea what to put in here. The title is fake and does not mean anything but to catch the eyes of the viewers. So what you can do is ignore this piece of writing and read something else useful.\n. Because I don't want you in here.",
            address:
                "B2 Police Station, Liberty Avenue, Karamadai, Chennai - 636001",
            time: "23 April, 2024",
        },
    ];
</script>

<main>
    <div class="reportBox">
        <h3 class="title">Reports:</h3>

        {#each records as r}
            <div class="report">
                <a href="/"> <!--TODO-->
                    <span style="font-size: 1.2rem; font-weight: 600;">
                        {r.title}
                    </span><br />

                    <span class="time">
                        {r.time}
                    </span><br />

                    <span class="address">
                        {r.address}
                    </span>

                    <p>
                        {r.description.slice(0, 200)}
                        {#if r.description.length > 200}
                            <span class="readmore"> (read more) </span>
                        {/if}
                    </p>
                </a>
            </div>
        {/each}
    </div>
</main>

<style>
    .reportBox {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 52rem;
        width: fit-content;
        margin: 0 auto;
        padding: 2rem;
    }
    .reportBox .title {
        font-weight: 500;
    }

    .report {
        padding: 1rem;
        border: 2px solid var(--elevate);
        background-color: var(--elevate);
    }

    .report a {
        text-decoration: none;
    }

    .report .time,
    .report .address {
        opacity: 0.9;
        font-size: 0.9rem;
    }

    .report p {
        margin-top: 1rem;
    }

    .report .readmore {
        opacity: 0.6;
    }
</style>
