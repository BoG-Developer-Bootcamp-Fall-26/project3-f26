import connectDB from "@server/mongodb";
import TrainingLog from "@server/mongodb/models/TrainingLog"
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
        const logs = await TrainingLog.find({});
        return res.status(200).json(logs);
    } catch {
        return res.status(500).json({ error: "Failed to fetch training logs" });
    }
}