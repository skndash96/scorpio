<script>
    import { cities, departments, showToast } from "$lib/utils";
    import SearchStatic from "$lib/components/SearchStatic.svelte";
    import SearchAsync from "$lib/components/SearchAsync.svelte";
    import supabase from "$lib/supabase";

    let /**@type {string}*/ title,
        /**@type {string}*/ info,
        /**@type {string}*/ date,
        /**@type {string|null}*/ city = null,
        /**@type {string|null}*/ dept = null,
        /**@type {ProfileSchema|null}*/ pf = null;

    async function addPost() {
        if (dept) dept = dept.trim();
        if (city) city = city.trim();

        if (!(title && dept && city && date && info)) {
            showToast("Please fill all required inputs");
        } else if (info.length < 200 || info.length > 4000) {
            showToast("Description has to be between 200 and 4000 charecters long");
        } else if (title.length < 20 || title.length > 200) {
            showToast("Title has to be between 20 and 200 charecters long");
        } else {
            /**@type {AddReport}*/
            let r = {
                timestamp: new Date(date),
                dept: dept,
                city: city,
                title,
                info, //TODO: sanitize input
                accountable: pf?.id || null,
            };

            let d = await supabase.from("reports").insert(r);

            d.error
                ? [console.error(d.error), showToast("Failed to submit report")]
                : showToast("Report submitted. Thank you.", "good");
        }
    }

    /**
     * @param {string} q
     * @returns {Promise<ProfileSchema[]>}
     */
    function getProfiles(q = "") {
        q = q.trim();

        return new Promise(async (res, rej) => {
            if (!q) return res([]);

            let d = await supabase
                .from("profiles")
                .select()
                .ilike("name", `%${q}%`)
                .limit(15);

            console.log("Matches:", d);

            if (d.error) rej(d.error);
            else res(d.data);
        });
    }
</script>

<svelte:head>
    <title>Scorpio | Write a Report</title>
</svelte:head>

<main>
    <form on:submit|preventDefault>
        <div class="title">
            <img src="/write.png" alt="write" width="30" height="30" />
            <h4>Write a Report</h4>
        </div>

        <div class="grid-2">
            <SearchStatic
                label="Department"
                data={departments}
                bind:value={dept}
            />
            <SearchStatic label="City" data={cities} bind:value={city} />
        </div>

        <fieldset>
            <label for="date"> Date: </label>
            <input
                name="date"
                bind:value={date}
                type="date"
                placeholder="Date"
            />
        </fieldset>

        <fieldset>
            <label for="title"> Title: </label>
            <input
                name="title"
                type="text"
                placeholder="write a suitable title"
                bind:value={title}
            />
        </fieldset>

        <fieldset>
            <label for="description"> Description: </label>

            <textarea
                name="description"
                placeholder="Elaborate on the incident - Mention - Name & Designation of Official and Location, Time, Date and Place of incidence."
                style="resize: vertical;"
                bind:value={info}
            ></textarea>
        </fieldset>

        <div class="pfBox">
            <SearchAsync
                label="Accountable person"
                getData={getProfiles}
                bind:value={pf}
            />
            <small style="opacity: .7"> (optional) </small>
        </div>

        <button type="submit" on:click={addPost}> Submit Report </button>
    </form>
</main>

<style>
    main {
        padding: 2rem;
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

    fieldset input,
    fieldset textarea {
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

    div.pfBox {
        margin-top: 1rem;
    }
</style>
