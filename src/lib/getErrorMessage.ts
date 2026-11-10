export function getErrorMessage(error: unknown, fallbackMessage = "Something went wrong."): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallbackMessage;
}
