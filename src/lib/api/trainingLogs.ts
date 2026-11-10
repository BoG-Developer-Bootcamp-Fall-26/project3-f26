import type { TrainingLog, TrainingLogWithDetails } from "@/types/models";

const TRAINING_ENDPOINT = "/api/training";

export interface NewTrainingLogInput {
  user: string;
  animal: string;
  title: string;
  description: string;
  hours: number;
  date: string;
}

export interface UpdateTrainingLogInput {
  _id: string;
  user: string;
  animal: string;
  title: string;
  description: string;
  hours: number;
}

export async function fetchTrainingLogsForUser(userId: string): Promise<TrainingLogWithDetails[]> {
  const response = await fetch(`${TRAINING_ENDPOINT}?userId=${encodeURIComponent(userId)}`);
  return readJsonOrThrow(response, "Could not load training logs.");
}

export async function createTrainingLog(input: NewTrainingLogInput): Promise<TrainingLog> {
  const response = await fetch(TRAINING_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return readJsonOrThrow(response, "Could not create the training log.");
}

export async function updateTrainingLog(input: UpdateTrainingLogInput): Promise<TrainingLog> {
  const response = await fetch(TRAINING_ENDPOINT, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return readJsonOrThrow(response, "Could not save the training log.");
}

async function readJsonOrThrow<T>(response: Response, fallbackMessage: string): Promise<T> {
  if (response.ok) {
    return response.json();
  }

  const backendMessage = await readBackendErrorMessage(response);
  throw new Error(backendMessage ?? fallbackMessage);
}

async function readBackendErrorMessage(response: Response): Promise<string | null> {
  try {
    const body = await response.json();
    if (typeof body.message === "string") {
      return body.message;
    }
    if (typeof body.error === "string") {
      return body.error;
    }
  } catch {
    return null;
  }
  return null;
}
