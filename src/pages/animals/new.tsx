import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import { useUser } from "@/hooks/useUser";

export default function NewAnimalPage() {
    const router = useRouter();
    const { user } = useUser();
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [hoursTrained, setHoursTrained] = useState("0");
    const [profilePicture, setProfilePicture] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!user) return;
        setError("");

        try {
            const res = await fetch("/api/animal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    breed,
                    owner: user.id,
                    hoursTrained: Number(hoursTrained),
                    profilePicture,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error);
                return;
            }
            router.push("/animals");
        } catch {
            setError("Something went wrong, please try again");
        }
    }

    const inputStyle = "rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-brand";

    return (
        <DashboardLayout>
            <PageHeader title="Animals" />
            <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5 p-4 md:p-8">
                <label className="flex flex-col gap-1 font-medium">
                    Animal Name
                    <input value={name} onChange={(e) => setName(e.target.value)} required className={inputStyle} />
                </label>
                <label className="flex flex-col gap-1 font-medium">
                    Breed
                    <input value={breed} onChange={(e) => setBreed(e.target.value)} required className={inputStyle} />
                </label>
                <label className="flex flex-col gap-1 font-medium">
                    Total hours trained
                    <input type="number" min="0" step="0.5" value={hoursTrained} onChange={(e) => setHoursTrained(e.target.value)} required className={inputStyle} />
                </label>
                <label className="flex flex-col gap-1 font-medium">
                    Picture URL
                    <input type="url" placeholder="https://..." value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} required className={inputStyle} />
                </label>
                {error && <p className="text-red-600">{error}</p>}
                <div className="flex gap-3">
                    <Link href="/animals" className="rounded-lg border border-brand px-8 py-2 font-semibold text-brand">
                        Cancel
                    </Link>
                    <button type="submit" className="rounded-lg bg-brand px-8 py-2 font-semibold text-white hover:bg-brand-dark">
                        Create
                    </button>
                </div>
            </form>
        </DashboardLayout>
    );
}
