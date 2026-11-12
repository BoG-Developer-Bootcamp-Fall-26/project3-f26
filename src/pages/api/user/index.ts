import connectDB from "@server/mongodb";
import User from "@server/mongodb/models/User"
import * as argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from "next";

/*
Create a POST endpoint at /api/user to create a user in the database 
based on information passed into the body. Make sure to hash the password 
using argon2
*/

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader("Allow", ["POST"]);
        return res.status(500).json({ error: `Method ${req.method} not supported` });
    }

    try {
        await connectDB();
    } catch {
        return res.status(500).json({ error: "DB connection failed" });
    }

    const {fullName, email, password, admin } = req.body ?? {};
    if (!fullName || !email || !password || typeof admin !== "boolean") {
        return res.status(400).json({ error: "Missing or invalid fields" });
    }

    try {
        if (await User.exists({ email })) {
            return res.status(400).json({error: "User with this email already exists" });
        }
        const hash = await argon2.hash(password);
        const user = await User.create({ fullName, email, password: hash, admin });
        return res.status(200).json({ id: user._id, fullName: user.fullName, admin: user.admin });
    } catch {
        return res.status(500).json({ error: "Failed to create new user" });
    }
}