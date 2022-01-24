import { addBusinessDays, isBefore, isSameDay, setHours } from "date-fns";
import { forEach, last } from "lodash-es";

import { Clinician, DaySomething } from "./types";

export const mapDays = (
  startDate: string,
  trainingDays: number,
  daysOff: string[],
  holidaySchedule: string[]
): Date[] => {
  const days: Date[] = [];
  while (trainingDays) {
    const previousTrainingDay = last(days);
    let nextDay = previousTrainingDay
      ? addBusinessDays(new Date(previousTrainingDay), 1)
      : setHours(new Date(startDate), 8);
    forEach(holidaySchedule, (holiday: string) => {
      if (isSameDay(setHours(new Date(holiday), 8), nextDay)) {
        nextDay = addBusinessDays(nextDay, 1);
      }
    });
    forEach(daysOff, (vacationDay: string) => {
      if (isSameDay(setHours(new Date(vacationDay), 8), nextDay)) {
        nextDay = addBusinessDays(nextDay, 1);
      }
    });
    days.push(nextDay);
    trainingDays--;
  }
  return days;
};

export const mapCliniciansToDates = (
  clinicians: Clinician[]
): DaySomething[] => {
  const results: DaySomething[] = [];
  const days: Map<string, Clinician[]> = new Map();

  clinicians.forEach((clinician) => {
    clinician.workDays.forEach((workDay) => {
      const dateString = workDay.toLocaleDateString();
      if (!days.has(dateString)) {
        days.set(dateString, []);
      }
      const arr = days.get(dateString);
      if (arr) {
        arr.push(clinician);
      }
    });
  });
  days.forEach((day, key) =>
    results.push({ date: key, cliniciansWorking: day })
  );
  return results.sort((d1, d2) =>
    isBefore(new Date(d1.date), new Date(d2.date)) ? -1 : 1
  );
};
