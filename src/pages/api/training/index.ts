import connectDB from "@server/mongodb";
import User from "@server/mongodb/models/User";
import Animal from "@server/mongodb/models/Animal";
import TrainingLog from "@server/mongodb/models/TrainingLog";
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

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

    const { user, animal, title, date, description } = req.body ?? {};
    const hours = parseFloat(req.body?.hours);
    const parsedDate = new Date(date);
    if (
        !mongoose.isObjectIdOrHexString(user) || 
        !mongoose.isObjectIdOrHexString(animal) ||
        !title ||
        !(typeof date === "string") ||
        isNaN(parsedDate.getTime()) ||
        !description ||
        !Number.isFinite(hours) || 
        hours < 0
    ) {
        return res.status(400).json({ error: "Missing or invalid fields" });
    }

    try {
        const owned = await Animal.exists({ _id: animal, owner: user });
        if (!owned) {
            return res.status(400).json({ error: "Animal does not exist or belong to user" });
        }

        const trainingLog = await TrainingLog.create({ user, animal, title, date: parsedDate, description, hours });
        return res.status(200).json({ id: trainingLog._id });
    } catch {
        return res.status(500).json({ error: "Failed to create training log" });
    }
}