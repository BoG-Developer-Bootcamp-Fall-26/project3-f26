
import type { NextApiRequest, NextApiResponse } from "next";
import { USERS_COLLECTION, getDatabase } from "@/server/getDatabase";

export default async function handleAdminUsersRequest(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "GET") {
    response.setHeader("Allow", ["GET"]);
    response.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    const users = await getDatabase()
      .collection(USERS_COLLECTION)
      .find({}, { projection: { password: 0 } })
      .toArray();

    response.status(200).json(users);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      message: "Could not retrieve users.",
    });
  }
}
