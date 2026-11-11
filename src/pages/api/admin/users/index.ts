import connectDB from "@server/mongodb";
import User from "@server/mongodb/models/User"
import * as argon2 from "argon2";
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
        const users = await User.find({}).select("-password");
        return res.status(200).json(users);
    } catch {
        return res.status(500).json({ error: "Failed to fetch users" });
    }
}