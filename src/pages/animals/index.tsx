import { useEffect, useState } from "react";
import AnimalCard from "@/components/AnimalCard";
import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import { useUser } from "@/hooks/useUser";
import type { Animal } from "@/utils/types";

export default function AnimalsPage() {
    const { user } = useUser();
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) return;
        fetch(`/api/animal?owner=${user.id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setAnimals(data);
                }
            })
            .catch(() => setError("Could not load animals"));
    }, [user]);

    return (
        <DashboardLayout>
            <PageHeader title="Animals" createLink="/animals/new" />
            <div className="p-4 md:p-8">
                {error && <p className="text-red-600">{error}</p>}
                {animals.length === 0 && <p className="text-gray-500">No animals to show.</p>}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {animals.map((animal) => (
                        <AnimalCard key={animal._id} animal={animal} />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
