
import type { NextApiRequest, NextApiResponse } from "next";
import {
  TRAINING_LOGS_COLLECTION,
  getDatabase,
} from "@/server/getDatabase";

export default async function handleAdminTrainingRequest(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "GET") {
    response.setHeader("Allow", ["GET"]);
    response.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    const trainingLogs = await getDatabase()
      .collection(TRAINING_LOGS_COLLECTION)
      .find({})
      .toArray();

    response.status(200).json(trainingLogs);
  } catch (error) {
    console.error(error);
    response.status(500).json({
    message: "Could not retrieve users.",
    error: error instanceof Error ? error.message : String(error),
    });
  }
}