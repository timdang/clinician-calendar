import { Clinician } from "../features/types";
import { mapCliniciansToDates } from "../features/utilities";

export interface CalendarProps {
  clinicians: Clinician[];
}

export const Calendar = ({ clinicians }: CalendarProps) => {
  const dayDetails = mapCliniciansToDates(clinicians);
  return (
    <div className="grid grid-cols-5">
      {dayDetails.map((day) => (
        <div key={day.date.toString()} className="border m-2">
          <div>{day.date}</div>
          {day.cliniciansWorking.map((c) => (
            <div key={c.guid}>
              <span style={{ color: c.color }}>
                {c.firstName} {c.lastName}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
