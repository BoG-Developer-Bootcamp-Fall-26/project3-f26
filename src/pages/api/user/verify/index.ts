import connectDB from "@server/mongodb";
import User from "@server/mongodb/models/User"
import * as argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(500).json({ error: `Method ${req.method} not supported` });
    }

    try {
        await connectDB();
    } catch {
        return res.status(500).json({ error: "DB connection failed" });
    }

    const { email, password } = req.body ?? {};
    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
        return res.status(400).json({ error: "User does not exist" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await argon2.verify(user.password, password))) {
            return res.status(500).json({ error: "User does not exist" });
        }
        return res.status(200).json({ id: user._id, admin: user.admin });
    } catch {
        return res.status(500).json({ error: "User does not exist" });
    }
}