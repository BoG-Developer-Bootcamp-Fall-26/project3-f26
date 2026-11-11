import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "@/server/connectDatabase";
import { AnimalModel } from "@/server/models/AnimalModel";
import { TrainingLogModel } from "@/server/models/TrainingLogModel";
import { isDatabaseId, isFilledString, isPositiveNumber } from "@/server/validateInput";

export default async function handleTrainingRequest(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    await createTrainingLog(request, response);
    return;
  }

  response.status(405).json({ message: "Method not allowed." });
}

async function createTrainingLog(request: NextApiRequest, response: NextApiResponse) {
  const body = request.body || {};

  if (!isFilledString(body.title) || !isFilledString(body.description)) {
    response.status(400).json({ message: "title and description are required." });
    return;
  }

  if (!isPositiveNumber(body.hours)) {
    response.status(400).json({ message: "hours must be a number that is 0 or more." });
    return;
  }

  if (!isDatabaseId(body.user) || !isDatabaseId(body.animal)) {
    response.status(400).json({ message: "user and animal must be valid ids." });
    return;
  }

  const date = new Date(body.date);
  if (Number.isNaN(date.getTime())) {
    response.status(400).json({ message: "date must be a valid date." });
    return;
  }

  try {
    await connectDatabase();

    const animal = await AnimalModel.findById(body.animal);
    if (!animal) {
      response.status(400).json({ message: "The animal does not exist." });
      return;
    }

    if (animal.owner.toString() !== body.user) {
      response.status(400).json({ message: "This animal does not belong to this user." });
      return;
    }

    const createdLog = await TrainingLogModel.create({
      user: body.user,
      animal: body.animal,
      title: body.title.trim(),
      date: date,
      description: body.description.trim(),
      hours: body.hours,
    });

    await AnimalModel.updateOne({ _id: body.animal }, { $inc: { hoursTrained: body.hours } });

    response.status(200).json(createdLog);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Could not create the training log." });
  }
}
