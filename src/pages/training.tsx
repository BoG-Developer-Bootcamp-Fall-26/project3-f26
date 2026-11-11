
import { useState } from "react";
import TrainingLogCard from "@/components/TrainingLogCard";

interface TrainingLog {
    _id: string;
    user: string;
    animal: string;
    title: string;
    date: Date | string;
    description: string;
    hours: number;
}

const sampleTrainingLogs: TrainingLog[] = [
    {
        _id: "1",
        user: "456",
        animal: "123",
        title: "Complete sit lessons",
        date: "2023-10-20",
        description: "Lucy finishes the sit lessons very well today. Should give her a treat",
        hours: 20
    },
    {
        _id: "2",
        user: "456",
        animal: "123",
        title: "Complete sit lessons",
        date: "2023-10-20",
        description: "Lucy finishes the sit lessons very well today. Should give her a treat",
        hours: 20
    },
    {
        _id: "3",
        user: "456",
        animal: "123",
        title: "Complete sit lessons",
        date: "2023-10-20",
        description: "Lucy finishes the sit lessons very well today. Should give her a treat",
        hours: 20
    },
    {
        _id: "4",
        user: "456",
        animal: "123",
        title: "Complete sit lessons",
        date: "2023-10-20",
        description: "Lucy finishes the sit lessons very well today. Should give her a treat",
        hours: 20
    }
];

export default function TrainingDashboard() {
    const [search, setSearch] = useState("");

    const filteredLogs = sampleTrainingLogs.filter((log) =>
        `${log.title} ${log.description}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-white">
            <div className="flex h-[50px] items-center justify-between border-b border-gray-200 px-7">
                <h1 className="text-[16px] font-semibold text-[#817775]">
                    Training logs
                </h1>

                <a
                    href="/training/new"
                    className="text-[13px] font-semibold text-[#817775] hover:text-red-600"
                >
                    ⊞ Create new
                </a>
            </div>

            <div className="px-7 py-6">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search training logs..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="w-full max-w-[400px] rounded-lg border border-gray-300 px-4 py-2 text-sm text-black outline-none focus:border-red-500"
                    />
                </div>

                {filteredLogs.length > 0 ? (
                    <div className="mx-auto flex max-w-[650px] flex-col gap-[17px]">
                        {filteredLogs.map((log) => (
                            <TrainingLogCard
                                key={log._id}
                                trainingLog={log}
                                userName="Long Lam"
                                animalName="Lucy"
                                animalBreed="Golden Retriever"
                                onEdit={() => {
                                    console.log("Edit training log:", log._id);
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="py-12 text-center text-gray-500">
                        No training logs found.
                    </p>
                )}
            </div>
        </main>
    );
}
