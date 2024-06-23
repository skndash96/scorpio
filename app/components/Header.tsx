import Image from "next/image";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import { BiSolidUserDetail as ProfileIcon } from "react-icons/bi";
import { RiFilePaperLine as ReportIcon } from "react-icons/ri";
import { VscAccount as AccountIcon } from "react-icons/vsc";

export default function Header() {    
    let icon = "px-2 py-1 rounded-md flex items-center gap-2 hover:bg-fuchsia-900 hover:bg-opacity-40";

    return (
        <header className="px-2 py-1 flex justify-between">
            <div className="flex items-center gap-2">
                <button className={icon}>
                    <BiMenu size={24} />
                </button>

                <Link className={icon} href="/">
                    <Image className="rounded-full" src="/favicon.png" alt="logo" width={24} height={24} />
                    <h2 className="font-bold text-2xl hidden sm:block"> Scorpio </h2>
                </Link>
            </div>

            <div className="flex gap-2">
                <Link href="/profiles" className={icon}>
                    <ProfileIcon size={24} />
                    <span className="hidden xs:inline"> Profiles </span>
                </Link>

                <Link href="/reports" className={icon}>
                    <ReportIcon size={20} />
                    <span className="hidden xs:inline"> Reports </span>
                </Link>
                
                <Link href="/write" className="px-2 py-1 rounded-md flex items-center gap-2 bg-fuchsia-50 bg-opacity-10 border-2 border-transparent hover:border-fuchsia-500 border-solid font-semibold">
                    <Image src="/write.png" width={24} height={24} alt="write icon" />
                    <span className="hidden xs:inline"> Write </span>
                </Link>

                <button className={icon}>
                    <AccountIcon size={20} />
                </button>
            </div>
        </header>
    );
}