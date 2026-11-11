import mongoose from 'mongoose';

export default async function connectDB() {
    const url = process.env.DB_URL;
    if (!url) {
        throw new Error("URL not set, check .env");
    }
    await mongoose.connect(url);
}