<script>
    import { cities, departments } from "$lib/report.js";
    import Search from "../../lib/Search.svelte";

    let city = -1,
        dept = -1;
</script>

<main>
    <form on:submit|preventDefault>
        <div class="title">
            <img src="/write.png" alt="write" width="30" height="30" />
            <h4>Write a Report</h4>
        </div>

        <div class="grid-2">
            <fieldset>
                <label for="department">
                    Department:

                    <span style="color: var(--quadernary);">
                        {dept >= 0 ? departments[dept] : ""}
                    </span>
                </label>

                <Search data={departments} bind:value={dept} />
            </fieldset>

            <fieldset>
                <label for="city">
                    City:
                    <span style="color: var(--quadernary);">
                        {city >= 0 ? cities[city] : ""}
                    </span>
                </label>

                <Search data={cities} bind:value={city} />
            </fieldset>
        </div>

        <fieldset>
            <label for="date"> Date: </label>
            <input name="date" type="date" placeholder="Date" />
        </fieldset>

        <fieldset>
            <label for="title"> Title: </label>
            <input
                name="title"
                type="text"
                placeholder="write a suitable title"
            />
        </fieldset>

        <fieldset>
            <label for="description"> Description: </label>

            <textarea
                name="description"
                placeholder="Elaborate on the incident - Mention - Name & Designation of Official and Location, Time, Date and Place of incidence."
                style="resize: vertical;"
            ></textarea>
        </fieldset>

        <button type="submit"> Submit Report </button>
    </form>
</main>

<style>
    main {
        padding: 2rem 1rem;
    }

    form {
        margin-top: 2rem;
        max-width: 40rem;
        margin: 0 auto;
    }

    form > * {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .title {
        flex-direction: row;
        align-items: center;
    }

    form label {
        opacity: 0.8;
        margin-bottom: 0.2rem;
    }

    form textarea {
        min-height: 10rem;
    }
    
    form .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
    @media (max-width: 556px) {
        form .grid-2 {
            margin-top: 2rem;
            grid-template-columns: 1fr;
        }
    }

    fieldset input,
    fieldset textarea {
        margin-left: 1rem;
        font-size: 0.9rem;
    }

    form button[type="submit"] {
        margin: 0 auto;
        margin-top: 1rem;
    }

    input[type="date"] {
        width: fit-content;
    }
    input[type="date"]::-webkit-calendar-picker-indicator {
        cursor: pointer;
    }
</style>
