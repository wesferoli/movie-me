import { DateTime } from "luxon";

export function getYear(date: string) {
  return DateTime.fromISO(date).year.toString();
}
