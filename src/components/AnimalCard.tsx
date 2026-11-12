import type { Animal } from "@/utils/types";

export default function AnimalCard({ animal, onDelete }: { animal: Animal; onDelete?: () => void }) {
    return (
        <div className="overflow-hidden rounded-xl bg-white shadow-md">
            <img src={animal.profilePicture} alt={animal.name} className="h-56 w-full bg-gray-100 object-cover" />
            <div className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white">
                    {animal.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate font-bold">
                        {animal.name} - {animal.breed}
                    </p>
                    <p className="text-sm text-gray-500">
                        {animal.owner ? animal.owner.fullName : "Unknown owner"} • Trained: {animal.hoursTrained}{" "}
                        {animal.hoursTrained === 1 ? "hour" : "hours"}
                    </p>
                </div>
                {onDelete && (
                    <button onClick={onDelete} className="text-sm text-gray-500 hover:text-brand">
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}
