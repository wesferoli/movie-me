export function errorHandler(err: any) {
  const is404 = err.message.toLowerCase().endsWith("not found");

  if (err?.name === "UnauthorizedError") {
    // JWT authentication error
    return new Error(
      JSON.stringify({ type: err.name, message: "Invalid Token" })
    );
  }

  // Validation error
  if (err?.name === "ZodError") {
    return new Error(
      JSON.stringify({ type: "ValidationError", details: err?.issues })
    );
  }

  // Generic error cases
  console.error(err);
  return new Error(
    JSON.stringify({ type: "GenericError", message: err.message })
  );
}
