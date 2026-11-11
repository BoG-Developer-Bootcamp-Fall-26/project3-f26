import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase } from "@/server/connectDatabase";
import { AnimalModel } from "@/server/models/AnimalModel";
import { UserModel } from "@/server/models/UserModel";
import { isDatabaseId, isFilledString, isPositiveNumber } from "@/server/validateInput";

export default async function handleAnimalRequest(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    await createAnimal(request, response);
    return;
  }

  response.status(405).json({ message: "Method not allowed." });
}

async function createAnimal(request: NextApiRequest, response: NextApiResponse) {
  const body = request.body || {};

  if (!isFilledString(body.name) || !isFilledString(body.breed) || !isFilledString(body.profilePicture)) {
    response.status(400).json({ message: "name, breed and profilePicture are required." });
    return;
  }

  if (!isPositiveNumber(body.hoursTrained)) {
    response.status(400).json({ message: "hoursTrained must be a number that is 0 or more." });
    return;
  }

  if (!isDatabaseId(body.owner)) {
    response.status(400).json({ message: "owner must be a valid user id." });
    return;
  }

  try {
    await connectDatabase();

    const owner = await UserModel.findById(body.owner);
    if (!owner) {
      response.status(400).json({ message: "The owner does not exist." });
      return;
    }

    const createdAnimal = await AnimalModel.create({
      name: body.name.trim(),
      breed: body.breed.trim(),
      owner: body.owner,
      hoursTrained: body.hoursTrained,
      profilePicture: body.profilePicture.trim(),
    });

    response.status(200).json(createdAnimal);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Could not create the animal." });
  }
}
