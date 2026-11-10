export interface User {
  _id: string;
  fullName: string;
  email: string;
  admin: boolean;
}

export interface Animal {
  _id: string;
  name: string;
  breed: string;
  owner: string;
  hoursTrained: number;
  profilePicture: string;
}

export interface TrainingLog {
  _id: string;
  user: string;
  animal: string;
  title: string;
  date: string;
  description: string;
  hours: number;
}

export interface TrainingLogWithDetails {
  _id: string;
  user: Pick<User, "_id" | "fullName">;
  animal: Pick<Animal, "_id" | "name" | "breed">;
  title: string;
  date: string;
  description: string;
  hours: number;
}
