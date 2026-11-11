import mongoose from "mongoose";

const CONNECTED_STATE = 1;

export async function connectDatabase(): Promise<void> {
  if (mongoose.connection.readyState === CONNECTED_STATE) {
    return;
  }

  const databaseUrl = process.env.MONGODB_URI;
  if (!databaseUrl) {
    throw new Error("MONGODB_URI is missing from the .env file.");
  }

  await mongoose.connect(databaseUrl);
}
