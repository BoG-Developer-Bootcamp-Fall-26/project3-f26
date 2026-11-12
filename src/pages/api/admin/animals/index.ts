import connectDB from "@server/mongodb";
import Animal from "@server/mongodb/models/Animal"
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(500).json({ error: `Method ${req.method} not supported` });
    }

    try {
        await connectDB();
    } catch {
        return res.status(500).json({ error: "DB connection failed" });
    }

    try {
        const animals = await Animal.find({}).populate("owner", "fullName");
        return res.status(200).json(animals);
    } catch {
        return res.status(500).json({ error: "Failed to fetch animals" });
    }
}