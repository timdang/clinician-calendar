import { addBusinessDays, isSameDay, isWednesday, isWeekend } from "date-fns";
import { filter, forEach, last, some } from "lodash-es";

import { Clinician, DailyTask } from "./types";

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

// TODO - Refactor
const getLastWorkDay = (taskDays: DailyTask[]): string => {
  const lastWork = last(taskDays)?.dailyTask;
  switch (lastWork) {
    case "Basic":
      return filter(taskDays, (day) => day.dailyTask === "Basic").length === 6
        ? "Basic Due"
        : "";
    case "Full":
      return filter(taskDays, (day) => day.dailyTask === "Full").length === 8
        ? "Full Due"
        : !some(taskDays, (day) => day.documentsDue === "Basic Due")
        ? "Basic Due"
        : "";
    case "Larc":
      return filter(taskDays, (day) => day.dailyTask === "Larc").length === 8
        ? "Larc Due"
        : !some(taskDays, (day) => day.documentsDue === "Full Due")
        ? "Full Due"
        : "";
    case "All Service":
      return filter(taskDays, (day) => day.dailyTask === "All Service")
        .length === 10
        ? "All Service Due"
        : !some(taskDays, (day) => day.documentsDue === "Larc Due")
        ? "Larc Due"
        : "";
    case "Orientation":
    default:
      return "";
  }
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
    // Handle Wednesdays
    if (isWednesday(nextDay) && count > 7 && didacticDayCount < 8) {
      const currentTaskDays = [...taskDays];
      taskDays.push({
        date: nextDay.toLocaleDateString(),
        dailyTask: `Didactic ${didacticDayCount}`,
        trainingCount: count,
        documentsDue: getLastWorkDay(currentTaskDays),
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

export const exportTableToCSV = (clinician: Clinician) => {
  var csv = [];
  csv.push("Date,Training Count,Daily Task,Documents Due?");
  const t = clinician.workDays;

  for (var i = 0; i < t.length; i++) {
    var row = [
      t[i].date,
      t[i].trainingCount,
      t[i].dailyTask,
      t[i].documentsDue,
    ];
    csv.push(row.join(","));
  }

  // download csv file
  downloadCSV(
    csv.join("\n"),
    `${clinician.lastName}_${clinician.firstName}.csv`
  );
};

export const downloadCSV = (csv: string, filename: string) => {
  var csvFile;
  var downloadLink;

  csvFile = new Blob([csv], { type: "text/csv" });
  downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
};
