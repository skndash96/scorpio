import supabase from '$lib/supabase.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    let id = params.id;

    let d = await supabase
        .from("reports")
        .select("*, accountable:profiles (name, image)")
        .eq("id", id)
        .maybeSingle();

    if (d.error) {
        return error(500, {
            message: d.error.message
        });
    } else if (!d.data) {
        return error(404, {
            message: "Page not Found"
        });
    } else {
        return {
            report: d.data
        };
    }

}