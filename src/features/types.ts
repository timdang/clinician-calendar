export interface Clinician {
  firstName: string;
  lastName: string;
  startDate: string;
  workDays: DailyTask[];
  color: ClinicianColor;
  guid: string;
  trainingDays: number;
  daysOff: string[];
}

export type ClinicianColor = "" | "red" | "blue" | "rebeccapurple" | "green";

export interface DailyTask {
  date: string;
  dailyTask: string;
  trainingCount?: number;
  documentsDue: string;
}
