import Image from "next/image";
import Link from "next/link";
import Report from "./Report";
import { getLetters } from "../lib/utils";
import List from "./List";

export default function Profile({
    record,
    expand
}: {
    record: ProfileSchema,
    expand: boolean
}) {
    if (expand) return (
        <ProfileCard expand={true} record={record} />
    );

    return (
        <Link href={"/profiles/" + record.id} className="block hover:bg-fuchsia-200 hover:bg-opacity-10">
            <ProfileCard expand={false} record={record} />
        </Link>
    );
}

function ProfileCard({
    record,
    expand
}: {
    record: ProfileSchema,
    expand: boolean
}) {
    return (
        <>
            <div className="p-2 flex items-center gap-4">
                <Avatar size={expand ? 80 : 48} image={record.image} name={record.name} />

                <div>
                    <h3 className={expand ? "mb-2 text-2xl font-bold" : ""}>
                        {record.name}
                    </h3>

                    <div className="flex items-center gap-1">
                        <Image src="/star.png" width={24} height={24} alt="star icon" />

                        <span>
                            {record.integrity}
                        </span>

                        <span className="opacity-50">
                            /10
                        </span>

                        <span className="ml-4 text-sm text-fuchsia-200">
                            {record.totalRatings} ratings
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}


function Avatar({
    image, name, size
}: {
    image: string | null, name: string, size: number
}) {
    if (image) return (
        <Image src={image} width={size} height={size} alt={name} />
    );

    return (
        <div style={{
            width: `${size}px`,
            height: `${size}px`
        }} className="p-2 shrink-0 grid place-items-center bg-fuchsia-800 rounded-full">
            {getLetters(name)}
        </div>
    );
}

