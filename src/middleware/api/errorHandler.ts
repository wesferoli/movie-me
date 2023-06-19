import { NextResponse } from "next/server";

export function errorHandler(err: any) {
  const is404 = err.message.toLowerCase().endsWith("not found");
  const statusCode = is404 ? 404 : 400;

  if (err?.name === "UnauthorizedError") {
    // JWT authentication error
    return NextResponse.json(
      { type: err.name, message: "Invalid Token" },
      { status: 401 }
    );
  }

  // Validation error
  if (err?.name === "ZodError") {
    return NextResponse.json(
      { type: "ValidationError", details: err?.issues },
      { status: err?.response?.status || statusCode }
    );
  }

  //Axios error
  if (err?.name === "AxiosError") {
    return NextResponse.json(
      { type: err.name, details: err?.response?.data },
      { status: err?.response?.status || statusCode }
    );
  }

  // Generic error cases
  console.error(err);
  return NextResponse.json(err, {
    status: err?.response?.status || statusCode,
  });
}
