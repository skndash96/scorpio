<script>
    import supabase from "$lib/supabase";
    import { cities, departments } from "$lib/report.js";
    import Search from "../../lib/Search.svelte";
    import { preventFormEnter } from "$lib/utils";
    import Loading from "$lib/Loading.svelte";
    import SearchDyn from "$lib/SearchDyn.svelte";

    let /**@type {string}*/ title,
        /**@type {string}*/ info,
        /**@type {string}*/ date,
        /**@type {number} index of selected city*/ city = -1,
        /**@type {number} index of selected dept*/ dept = -1,
        /**@type {ProfileSchema|null}*/ pf = null,
        /**@type {Promise<any>|null}*/ add_stat;

    /**
     * @param {string} q
     * @returns {Promise<ProfileSchema[]>}
     */
    function get(q) {
        q = q.trim();

        return new Promise(async (res, rej) => {
            if (!q) return res([]);

            let d = await supabase
                .from("profiles")
                .select()
                .ilike("name", `%${q}%`)
                .limit(15);
            
            console.log(d);
            
            if (d.error) rej(d.error);
            else res(d.data);
        });
    }

    function addPost() {
        add_stat = new Promise(async (res, rej) => {
            if (!(title && dept >= 0 && city >= 0 && date && info)) {
                rej("Please fill all of the above input");
            } else if (info.length < 200 || info.length > 4000) {
                rej(
                    "Description has to be between 200 and 4000 charecters long",
                );
            } else if (title.length < 20 || title.length > 200) {
                rej("Title has to be between 20 and 200 charecters long");
            } else {
                /**@type {AddReport}*/
                let r = {
                    timestamp: new Date(date),
                    dept: departments[dept],
                    city: cities[city],
                    title,
                    info, //TODO: sanitize input
                    accountable: pf?.id || null,
                };

                let d = await supabase.from("reports").insert(r);

                d.error
                    ? [console.error(d.error), rej("Failed to submit report")]
                    : res("Report submitted. Thank you.");
            }
        });
    }
</script>

<svelte:head>
    <title> Scorpio | Write a Report </title>
</svelte:head>

<main>
    <form on:submit|preventDefault={addPost}>
        <div class="title">
            <img src="/write.png" alt="write" width="30" height="30" />
            <h4>Write a Report</h4>
        </div>

        <div class="grid-2">
            <Search label="Department" data={departments} bind:value={dept} />
            <Search label="City" data={cities} bind:value={city} />
        </div>

        <fieldset>
            <label for="date"> Date: </label>
            <input
                name="date"
                bind:value={date}
                type="date"
                placeholder="Date"
                on:keydown={preventFormEnter}
            />
        </fieldset>

        <fieldset>
            <label for="title"> Title: </label>
            <input
                name="title"
                type="text"
                placeholder="write a suitable title"
                bind:value={title}
                on:keydown={preventFormEnter}
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
            <SearchDyn label="Accountable person" bind:value={pf} {get} />
        </div>

        <button type="submit"> Submit Report </button>

        <p class="stat">
            {#if add_stat}
                {#await add_stat}
                    <Loading />
                {:then m}
                    {m}
                {:catch e}
                    {e.message || e}
                {/await}
            {/if}
        </p>
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
        margin-left: 1rem;
        font-size: 0.9rem;
    }

    form button[type="submit"] {
        margin: 0 auto;
        margin-top: 1rem;
    }

    form p.stat {
        max-width: 20rem;
        width: fit-content;
        margin: 1rem auto;
        text-align: center;
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
