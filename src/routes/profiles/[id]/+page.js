import supabase from '$lib/supabase.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    let id = params.id;

    let d = await supabase
        .from("profiles")
        .select("*, accountable:reports (*)")
        .eq("id", id)
        .maybeSingle();

    if (d.error) {
        return error(500, {
            message: d.error.message
        });
    } else if (!d.data) {
        return error(404, {
            message: "Profile not Found"
        });
    } else {
        return {
            profile: d.data
        };
    }

}