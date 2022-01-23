export interface Clinician {
  firstName: string;
  lastName: string;
  startDate: string;
  workDays: Date[];
  color: ClinicianColor;
}

export type ClinicianColor = "red" | "blue" | "rebeccapurple" | "green";
