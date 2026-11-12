import Image from "next/image";
import Link from "next/link";
import createNewLogo from "../../public/images/createNewLogo.png";

export default function PageHeader({ title, createLink }: { title: string; createLink?: string }) {
    return (
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 md:px-8">
            <h1 className="text-2xl font-medium text-gray-600">{title}</h1>
            {createLink && (
                <Link href={createLink} className="flex items-center gap-2 text-gray-600 hover:text-brand">
                    <Image src={createNewLogo} alt="" className="h-5 w-5" />
                    Create new
                </Link>
            )}
        </div>
    );
}
