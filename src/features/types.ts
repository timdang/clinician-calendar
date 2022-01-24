export interface Clinician {
  firstName: string;
  lastName: string;
  startDate: string;
  workDays: string[];
  color: ClinicianColor;
  guid: string;
  trainingDays: number;
  daysOff: string[];
}

export type ClinicianColor = "" | "red" | "blue" | "rebeccapurple" | "green";

export interface DaySomething {
  date: string;
  cliniciansWorking: Clinician[];
}
