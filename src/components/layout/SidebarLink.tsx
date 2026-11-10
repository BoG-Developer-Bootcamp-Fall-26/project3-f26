import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface SidebarLinkProps {
  href: string;
  label: string;
  activeIcon: StaticImageData;
  inactiveIcon: StaticImageData;
}

export default function SidebarLink({ href, label, activeIcon, inactiveIcon }: SidebarLinkProps) {
  const router = useRouter();
  const isActive = router.pathname === href || router.pathname.startsWith(`${href}/`);

  const stateClasses = isActive ? "bg-brand-red text-white" : "text-gray-700 hover:bg-gray-100";

  return (
    <Link href={href} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${stateClasses}`}>
      <Image src={isActive ? activeIcon : inactiveIcon} alt="" width={20} height={20} />
      {label}
    </Link>
  );
}
