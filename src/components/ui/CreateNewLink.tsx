import Image from "next/image";
import Link from "next/link";
import createNewIcon from "../../../public/images/createNewLogo.png";

interface CreateNewLinkProps {
  href: string;
}

export default function CreateNewLink({ href }: CreateNewLinkProps) {
  return (
    <Link href={href} className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
      <Image src={createNewIcon} alt="" width={16} height={16} />
      Create new
    </Link>
  );
}
