import Link from "next/link";
import { formatTimestamp } from "../lib/utils";
import Profile from "./Profile";

function Content({
    record,
    expand
}: {
    record: ReportSchema,
    expand: boolean
}
) {
    return (
        <div className="p-2">
            <h3 className="text-xl font-semibold">
                {record.title}
            </h3>

            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm *:px-2 *:bg-fuchsia-300 *:bg-opacity-10 *:text-fuchsia-400 *:text-nowrap">
                <span> {formatTimestamp(record.created_at)} </span>
                <span> {record.dept} </span>
                <span> {record.city} </span>
            </div>


            {expand
                ? (
                    // TODO: Sanitise
                    <p className="mt-3" dangerouslySetInnerHTML={{ __html: formatInfo(record.info)}} />
                ) : (
                    <p className="mt-3">
                        {record.info.slice(0, 200) + "..."}
                    </p>
                )
            }

            <br/>
            
            {expand && record.accountable && (
                <>
                    <h4 className="text-sm text-fuchsia-300"> Accountable: </h4>
                    <Profile record={record.accountable} expand={false} />
                </>
            )}
        </div>
    );
}

export default function Report({
    record,
    expand
}: {
    record: ReportSchema,
    expand: boolean
}) {
    let c = <Content record={record} expand={expand} />;

    if (expand) return c;

    return (
        <Link href={`/reports/${record.id}`} className="hover:bg-fuchsia-200 hover:bg-opacity-10">
            {c}
        </Link>
    );
}

function formatInfo(s: string) {
    //TODO: switch to markdown
    return s
        .replaceAll("\n", "<br/>")
        .replaceAll(/\*\*(.+?)\*\*/g, "<strong> $1 </strong>") //bold
        .replaceAll(/\_(.+?)\_/g, "<underline> $1 </underline>") //underline
        .replaceAll(/\*(.+?)\*/g, "<i> $1 </i>"); //italics
}
