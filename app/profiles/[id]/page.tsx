import Error from "@/app/components/Error";
import Profile from "@/app/components/Profile";
import supabase from "@/app/lib/supabase";
import Head from "next/head";

async function get(id: string) {
    return await supabase
        .from("profiles")
        .select<any, ProfileSchema>("*, accountable:reports(*)")
        .eq("id", id)
        .maybeSingle();
}

export default async function ProfilePage({
    params: { id }
}: {
    params: { id: string }
}) {

    let { data: record, error } = await get(id);

    if (error) return <Error
        message="Failed to get Profile"
        statusCode={500}
    />;

    if (!record) return <Error
        message="Profile not found"
        statusCode={404}
    />;

    return (
        <div className="p-2 max-w-2xl mr-auto">
            <Head>
                <title> Scorpio | {record.name} </title>
            </Head>

            <Profile record={record} expand={true} />
        </div>
    );
}