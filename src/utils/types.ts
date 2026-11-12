export type User = {
    _id: string;
    fullName: string;
    email: string;
    admin: boolean;
};

export type Animal = {
    _id: string;
    name: string;
    breed: string;
    owner: { _id: string; fullName: string } | null;
    hoursTrained: number;
    profilePicture: string;
};

export type TrainingLog = {
    _id: string;
    user: { _id: string; fullName: string } | null;
    animal: { _id: string; name: string; breed: string } | null;
    title: string;
    date: string;
    description: string;
    hours: number;
};
