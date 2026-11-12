import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/useUser";

import activeTraining from "../../public/images/activeTrainingLogo.png";
import inactiveTraining from "../../public/images/inactiveTrainingLogs.png";
import activeAnimals from "../../public/images/activeAnimalsLogo.png";
import inactiveAnimals from "../../public/images/inactiveAnimalLogo.png";
import activeAllTraining from "../../public/images/activeAllTrainingLogo.png";
import inactiveAllTraining from "../../public/images/inactiveAllTrainingLogo.png";
import activeAllAnimals from "../../public/images/activeAllAnimalsLogo.png";
import inactiveAllAnimals from "../../public/images/inactiveAllAnimalsLogo.png";
import activeAllUsers from "../../public/images/activeAllUsersLogo.png";
import inactiveAllUsers from "../../public/images/inactiveAllUsersLogo.png";
import logoutLogo from "../../public/images/logoutLogo.png";

type NavItem = { href: string; label: string; active: StaticImageData; inactive: StaticImageData };
const USER_LINKS: NavItem[] = [
    { href: "/training-logs", label: "Training logs", active: activeTraining, inactive: inactiveTraining },
    { href: "/animals", label: "Animals", active: activeAnimals, inactive: inactiveAnimals },
];
const ADMIN_LINKS: NavItem[] = [
    { href: "/admin/training", label: "All training", active: activeAllTraining, inactive: inactiveAllTraining },
    { href: "/admin/animals", label: "All animals", active: activeAllAnimals, inactive: inactiveAllAnimals },
    { href: "/admin/users", label: "All users", active: activeAllUsers, inactive: inactiveAllUsers },
];

export default function Sidebar() {
    const router = useRouter();
    const { user, logout } = useUser();

    function handleLogout() {
        logout();
        router.push("/");
    }
    function renderLink(item: NavItem) {
        const isActive = router.pathname === item.href || router.pathname.startsWith(item.href + "/");
        return (
            <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors ${
                    isActive ? "bg-brand text-white" : "text-[#565353] hover:bg-gray-100"
                }`}
            >
                <Image src={isActive ? item.active : item.inactive} alt={item.label} className="h-6 w-6 object-contain" />
                {item.label}
            </Link>
        );
    }

    return (
        <nav className="flex h-full flex-col gap-1 bg-white px-4 py-6">
            <div className="flex flex-col gap-1">{USER_LINKS.map(renderLink)}</div>
            {user?.admin && (
                <div className="mt-6 flex flex-col gap-1 border-t border-gray-200 pt-6">
                    <p className="px-4 pb-2 text-sm font-medium text-gray-500">Admin access</p>
                    {ADMIN_LINKS.map(renderLink)}
                </div>
            )}
            <div className="mt-auto flex items-center gap-3 border-t border-gray-200 px-2 pt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
                    {user?.fullName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{user?.fullName}</p>
                    <p className="text-sm text-gray-500">{user?.admin ? "Admin" : "User"}</p>
                </div>
                <button onClick={handleLogout} title="Log out" className="rounded p-1 hover:bg-gray-100">
                    <Image src={logoutLogo} alt="Log out" className="h-6 w-6" />
                </button>
            </div>
        </nav>
    );
}
