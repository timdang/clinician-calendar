import { isBefore } from "date-fns";
import { filter, uniq } from "lodash-es";
import { useState } from "react";

export interface AddTimeOffProps {
  days: string[];
  onClose: (daysOff: string[]) => void;
  isETO?: boolean;
}
export function AddTimeOff({ days, onClose, isETO = true }: AddTimeOffProps) {
  const [timeOff, setTimeOff] = useState<string[]>(days);
  const [date, setDate] = useState("");
  const [addDate, setAddDate] = useState(false);

  const onAddDate = (newDate: string) => {
    const newDayOff = new Date(
      `${newDate} 8:00`.replace(/-/g, "/")
    ).toLocaleDateString();
    const newDaysOff = uniq([...timeOff, ...[newDayOff]]).sort((d1, d2) =>
      isBefore(new Date(d1), new Date(d2)) ? -1 : 1
    );
    setTimeOff(newDaysOff);
    onClose(newDaysOff);
    setDate("");
  };

  const onRemoveDate = (date: string) => {
    const newDaysOff = filter(timeOff, (day: string) => day !== date);
    setTimeOff(newDaysOff);
    onClose(newDaysOff);
    setDate("");
  };

  return (
    <>
      {timeOff.length > 0 && (
        <>
          <span>{isETO ? "ETO Days" : "Holidays"}</span>
          <ul className="border rounded max-h-48 overflow-scroll">
            {timeOff.map((day) => (
              <li key={day}>
                <span>{day}</span>{" "}
                <button
                  className="text-red-800"
                  type="button"
                  onClick={() => onRemoveDate(day)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      {addDate && (
        <>
          <input
            className="m-2"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            className="px-4 py-2 text-blue-800 disabled:text-neutral-300"
            type="button"
            disabled={!date}
            onClick={() => {
              console.warn(date);
              onAddDate(date);
              setAddDate(false);
            }}
          >
            Add
          </button>
        </>
      )}
      {!addDate && (
        <button
          className="px-4 py-2 text-blue-800"
          type="button"
          onClick={() => setAddDate(true)}
        >
          Add {isETO ? "ETO" : "Holiday"}
        </button>
      )}
    </>
  );
}
