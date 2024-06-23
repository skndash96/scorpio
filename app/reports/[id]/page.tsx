import Error from "@/app/components/Error";
import Report from "@/app/components/Report";
import supabase from "@/app/lib/supabase";

async function get(id: string) {
    return await supabase
        .from("reports")
        .select("*, accountable:profiles(*)")
        .eq("id", id)
        .maybeSingle();
}

export default async function ReportPage({
    params: { id }
}: {
    params: { id: string }
}) {

    let { data: record, error } = await get(id);
    
    if (error) return <Error
        message="Failed to get Report"
        statusCode={500}
    />;
    
    if (!record) return <Error
        message="Report not found"
        statusCode={404}
    />;
    
    return (
        <div className="p-2 max-w-4xl mx-auto">
            <Report record={record} expand={true} />
        </div>
    );
}