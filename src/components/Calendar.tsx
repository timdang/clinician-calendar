import { getDay, isFirstDayOfMonth } from "date-fns";

import { Clinician, DailyTask } from "../features/types";
import { CalendarDay } from "./CalendarDay";

export interface CalendarProps {
  clinician: Clinician;
}

export const Calendar = ({ clinician }: CalendarProps) => {
  const calendarMapper = (day: DailyTask, idx: number) => {
    const colIndex = getDay(new Date(day.date));
    const addBufferSpaces = idx === 0 || isFirstDayOfMonth(new Date(day.date));
    const mappingArray = [...Array(colIndex - 1)].map((x) => 0);

    return (
      <>
        {isFirstDayOfMonth(new Date(day.date)) && (
          <div className="col-span-5 py-2 bg-gray-200">
            {new Date(day.date).toLocaleDateString("en-us", { month: "long" })}
          </div>
        )}
        {addBufferSpaces &&
          mappingArray.map((_, idx) => (
            <div key={idx} className="tw-bg-purple"></div>
          ))}
        <CalendarDay day={day} />
      </>
    );
  };

  return (
    <div className="grid grid-cols-5">
      {clinician.workDays?.map(calendarMapper)}
    </div>
  );
};
