import { DateTime } from "luxon";

export function getYear(date: string) {
  if (date) return DateTime.fromISO(date).year.toString();
  return null;
}
