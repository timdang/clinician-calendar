import { addBusinessDays, isSameDay, isWednesday, isWeekend } from "date-fns";
import { forEach, last } from "lodash-es";

import { DailyTask } from "./types";

export const crudeWorkArray = [
  "Orientation",
  "Orientation",
  "Orientation",
  "Orientation",
  "Orientation",
  "Orientation",
  "Orientation",
  "Basic",
  "Basic",
  "Basic",
  "Basic",
  "Basic",
  "Basic",
  "Full",
  "Full",
  "Full",
  "Full",
  "Full",
  "Full",
  "Full",
  "Full",
  "Larc",
  "Larc",
  "Larc",
  "Larc",
  "Larc",
  "Larc",
  "Larc",
  "Larc",
  "All Service",
  "All Service",
  "All Service",
  "All Service",
  "All Service",
  "All Service",
  "All Service",
  "All Service",
  "All Service",
  "All Service",
  "Transitional",
  "Transitional",
  "Transitional",
  "Transitional",
];

function* generateWorkDay() {
  for (let i = 0; i < crudeWorkArray.length; i += 1) {
    yield crudeWorkArray[i];
  }
}

const getLastWorkDay = (dailyTasks: DailyTask[]): string => {
  // TODO

  return last(dailyTasks)?.dailyTask || "";
};

export const mapDays = (
  startDate: string,
  trainingDays: number,
  daysOff: string[],
  holidaySchedule: string[]
): DailyTask[] => {
  const taskDays: DailyTask[] = [];
  let count = 1;
  let didacticDayCount = 1;
  const workDescription = generateWorkDay();

  while (count <= +trainingDays) {
    const previousTrainingDay = last(taskDays)?.date;
    let nextDay = previousTrainingDay
      ? addBusinessDays(new Date(previousTrainingDay), 1)
      : new Date(`${startDate} 8:00`.replace(/-/g, "/"));
    if (isWeekend(nextDay)) {
      nextDay = addBusinessDays(nextDay, 1);
    }
    forEach(holidaySchedule, (holiday: string) => {
      if (isSameDay(new Date(`${holiday} 8:00`.replace(/-/g, "/")), nextDay)) {
        taskDays.push({
          date: nextDay.toLocaleDateString(),
          dailyTask: "Holiday",
          documentsDue: "",
        });
        nextDay = addBusinessDays(nextDay, 1);
      }
    });
    forEach(daysOff, (vacationDay: string) => {
      if (
        isSameDay(new Date(`${vacationDay} 8:00`.replace(/-/g, "/")), nextDay)
      ) {
        taskDays.push({
          date: nextDay.toLocaleDateString(),
          dailyTask: "ETO",
          documentsDue: "",
        });
        nextDay = addBusinessDays(nextDay, 1);
      }
    });
    if (isWednesday(nextDay) && count > 7 && didacticDayCount < 8) {
      taskDays.push({
        date: nextDay.toLocaleDateString(),
        dailyTask: `Didactic ${didacticDayCount}`,
        trainingCount: count,
        documentsDue: getLastWorkDay(taskDays),
      });
      didacticDayCount++;
    } else {
      taskDays.push({
        date: nextDay.toLocaleDateString(),
        dailyTask: workDescription.next().value || "",
        trainingCount: count,
        documentsDue: "",
      });
    }
    count++;
  }
  return taskDays;
};

// export const mapCliniciansToDates = (
//   clinicians: Clinician[]
// ): DailyTask[] => {
//   const results: DailyTask[] = [];
//   const days: Map<string, Clinician[]> = new Map();

//   clinicians.forEach((clinician) => {
//     clinician.workDays.forEach((dateString) => {
//       if (!days.has(dateString)) {
//         days.set(dateString, []);
//       }
//       const arr = days.get(dateString);
//       if (arr) {
//         arr.push(clinician);
//       }
//     });
//   });
//   days.forEach((day, key) =>
//     results.push({ date: key, cliniciansWorking: day })
//   );
//   return results.sort((d1, d2) =>
//     isBefore(new Date(d1.date), new Date(d2.date)) ? -1 : 1
//   );
// };
