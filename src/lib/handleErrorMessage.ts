const errorMessage = {
  ValidationError: "One or more fields were not filled correctly.",
  GenericError: "You can try again clicking the button below.",
  UnauthorizedError: "You need to be connected to access this page.",
};

export function handleErrorMessage(
  errorType:
    | "ValidationError"
    | "GenericError"
    | "UnauthorizedError" = "GenericError"
) {
  return errorMessage[errorType];
}
