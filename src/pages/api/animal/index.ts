import connectDB from "@server/mongodb";
import Animal from "@server/mongodb/models/Animal"
import User from "@server/mongodb/models/User";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

/*
Create a POST endpoint at /api/animal to create an animal in the database based on information passed into the body
Create a PATCH endpoint at /api/animal to update the hoursTrained of an animal whenever a new training log is made or updated

*/
export default async function handler(req: NextApiRequest, res: NextApiResponse ) {
    if (req.method !== "GET" && req.method !== "POST" && req.method !== "PATCH") {
        res.setHeader("Allow", ["GET", "POST", "PATCH"]);
        return res.status(500).json({ error: `Method ${req.method} not supported` });
    }

    try {
        await connectDB();
    } catch {
        return res.status(500).json({ error: "DB connection failed" });
    }

    if (req.method === "GET") {
        const { owner } = req.query;
        if (!mongoose.isObjectIdOrHexString(owner)) {
            return res.status(400).json({ error: "Missing or invalid owner" });
        }
        try { 
            const animals = await Animal.find({ owner }).populate("owner", "fullName");
            return res.status(200).json(animals)
        } catch {
            return res.status(500).json({ error: "Failed to fetch animals" });
        }
    }

    if (req.method === "POST") {
        const { name, breed, owner, profilePicture } = req.body ?? {};
        const hoursTrained = parseFloat(req.body?.hoursTrained);
        if (
            !name ||
            !breed ||
            !mongoose.isObjectIdOrHexString(owner) ||
            !Number.isFinite(hoursTrained) ||
            hoursTrained < 0 ||
            !profilePicture //ok i lowk dk how to check if profile pic is a valid url. google later
        ) {
            return res.status(400).json({ error: "Missing or invalid fields" });
        }

        if (!(await User.exists({ _id: owner }))) {
            return res.status(400).json({ error: "Animal owner does not exist" });
        }

        try {
            const animal = await Animal.create({ name, breed, owner, hoursTrained, profilePicture });
            return res.status(200).json({ id: animal._id });
        } catch {
            return res.status(500).json({ error: "Failed to create animal" });
        }
    } else {
        const { animal } = req.body ?? {};
        const hours = parseFloat(req.body?.hours);
        if (!mongoose.isObjectIdOrHexString(animal) || !Number.isFinite(hours)) {
            return res.status(400).json({ error: "Missing or invalid fields" });
        }

        try {
            const updated = await Animal.findByIdAndUpdate(
                animal,
                { $inc: { hoursTrained: hours } },
                { returnDocument: "after" }
            );
            if (!updated) {
                return res.status(400).json({ error: "Animal does not exist" });
            }
            return res.status(200).json({ hoursTrained: updated.hoursTrained });
        } catch {
            return res.status(500).json({ error: "Failed to update animal" });
        }
    }
}