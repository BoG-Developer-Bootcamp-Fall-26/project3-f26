import type { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2";
import { connectDatabase } from "@/server/connectDatabase";
import { UserModel } from "@/server/models/UserModel";
import { isFilledString } from "@/server/validateInput";

export default async function handleUserRequest(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    await createUser(request, response);
    return;
  }

  response.status(405).json({ message: "Method not allowed." });
}

async function createUser(request: NextApiRequest, response: NextApiResponse) {
  const body = request.body || {};

  if (!isFilledString(body.fullName) || !isFilledString(body.email) || !isFilledString(body.password)) {
    response.status(400).json({ message: "fullName, email and password are required." });
    return;
  }

  if (typeof body.admin !== "boolean") {
    response.status(400).json({ message: "admin must be true or false." });
    return;
  }

  try {
    await connectDatabase();

    const email = body.email.trim();
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      response.status(400).json({ message: "An account with this email already exists." });
      return;
    }

    const hashedPassword = await argon2.hash(body.password);
    const createdUser = await UserModel.create({
      fullName: body.fullName.trim(),
      email: email,
      password: hashedPassword,
      admin: body.admin,
    });

    response.status(200).json({
      _id: createdUser._id,
      fullName: createdUser.fullName,
      email: createdUser.email,
      admin: createdUser.admin,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Could not create the user." });
  }
}
