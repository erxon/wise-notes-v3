/**
 * Translates technical database error codes to user-friendly messages.
 * @param error Any error object, expected to have a 'code' property for database errors.
 * @returns A user-friendly error message string.
 */

export function getFriendlyErrorMessage(error: unknown): string {
  // Check for Supabase / PostgREST error codes
  // https://postgrest.org/en/stable/references/errors.html
  // https://www.postgresql.org/docs/current/errcodes-appendix.html

  if (!error) return "An unknown error occurred.";

  const err = error as { code?: string; message?: string };
  const code = err.code;

  switch (code) {
    case "23503":
      return "This item is referenced by other records and cannot be deleted.";
    case "23505":
      return "This record already exists.";
    case "PGRST116":
      return "The requested record was not found.";
    case "invalid_credentials":
      return "Invalid email or password.";
    case "email_not_confirmed":
      return "Please verify your email address before logging in.";
    default:
      return err.message || "An unexpected error occurred. Please try again.";
  }
}
