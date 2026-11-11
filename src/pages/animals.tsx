
import { useState } from "react";
import AnimalCard from "@/components/AnimalCard";

interface Animal {
    _id: string;
    name: string;
    breed: string;
    owner: string;
    hoursTrained: number;
    profilePicture: string;
}

const sampleAnimals: Animal[] = [
    {
        _id: "1",
        name: "Lucy",
        breed: "Golden Retriever",
        owner: "456",
        hoursTrained: 100,
        profilePicture: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg"
    },
    {
        _id: "2",
        name: "Lucy",
        breed: "Golden Retriever",
        owner: "456",
        hoursTrained: 100,
        profilePicture: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg"
    },
    {
        _id: "3",
        name: "Lucy",
        breed: "Golden Retriever",
        owner: "456",
        hoursTrained: 100,
        profilePicture: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg"
    },
    {
        _id: "4",
        name: "Lucy",
        breed: "Golden Retriever",
        owner: "456",
        hoursTrained: 100,
        profilePicture: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg"
    },
    {
        _id: "5",
        name: "Lucy",
        breed: "Golden Retriever",
        owner: "456",
        hoursTrained: 100,
        profilePicture: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg"
    },
    {
        _id: "6",
        name: "Lucy",
        breed: "Golden Retriever",
        owner: "456",
        hoursTrained: 100,
        profilePicture: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg"
    }
];

export default function AnimalsDashboard() {
    const [search, setSearch] = useState("");

    const filteredAnimals = sampleAnimals.filter((animal) =>
        `${animal.name} ${animal.breed}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-white">
            <div className="flex h-[50px] items-center justify-between border-b border-gray-200 px-7">
                <h1 className="text-[16px] font-semibold text-[#817775]">
                    Animals
                </h1>

                <a
                    href="/animals/new"
                    className="text-[13px] font-semibold text-[#817775] hover:text-red-600"
                >
                    ⊞ Create new
                </a>
            </div>

            <div className="px-7 py-6">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search animals..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="w-full max-w-[400px] rounded-lg border border-gray-300 px-4 py-2 text-sm text-black outline-none focus:border-red-500"
                    />
                </div>

                {filteredAnimals.length > 0 ? (
                    <div className="grid grid-cols-1 justify-items-center gap-x-7 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
                        {filteredAnimals.map((animal) => (
                            <AnimalCard
                                key={animal._id}
                                animal={animal}
                                ownerName="Long Lam"
                            />
                        ))}
                    </div>
                ) : (
                    <p className="py-12 text-center text-gray-500">
                        No animals found.
                    </p>
                )}
            </div>
        </main>
    );
}
