import { addBusinessDays, isSameDay } from "date-fns";
import { forEach, last } from "lodash-es";

import { Clinician } from "./types";

export const mapDays = (
  clinician: Clinician,
  trainingDays: number,
  vacationSchedule: string[],
  holidaySchedule: string[]
): string[] => {
  const days: string[] = [];
  while (trainingDays) {
    const previousTrainingDay = last(days);
    let nextDay = previousTrainingDay
      ? addBusinessDays(new Date(previousTrainingDay), 1)
      : new Date(`${clinician.startDate} 00:00:00 PST`);
    forEach(holidaySchedule, (holiday: string) => {
      if (isSameDay(new Date(`${holiday} 00:00:00 PST`), nextDay)) {
        nextDay = addBusinessDays(nextDay, 1);
      }
    });
    forEach(vacationSchedule, (vacationDay: string) => {
      if (isSameDay(new Date(`${vacationDay} 00:00:00 PST`), nextDay)) {
        nextDay = addBusinessDays(nextDay, 1);
      }
    });
    days.push(nextDay.toDateString());
    trainingDays--;
  }
  return days;
};
