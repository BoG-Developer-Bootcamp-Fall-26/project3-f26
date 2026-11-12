import type { User } from "@/utils/types";

export default function UserCard({ user }: { user: User }) {
    return (
        <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-md">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-xl font-bold text-white">
                {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
                <p className="truncate font-bold">{user.fullName}</p>
                <p className="truncate text-sm text-gray-500">
                    {user.admin ? "Admin" : "User"} • {user.email}
                </p>
            </div>
        </div>
    );
}
