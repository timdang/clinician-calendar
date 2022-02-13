import { DailyTask } from "../features/types";

export interface CalendarDayProps {
  day: DailyTask;
}

export const CalendarDay = ({ day }: CalendarDayProps) => {
  return (
    <>
      <div
        key={day.date.toString()}
        className={`border rounded m-2 ${
          day.dailyTask === "Holiday" || day.dailyTask === "ETO"
            ? "bg-slate-200"
            : ""
        }`}
      >
        <div className="font-bold text-gray-600 text-sm">
          {new Date(day.date).toLocaleDateString()}
        </div>
        <div>
          <div className="text-sm">
            {day.trainingCount && `Day ${day.trainingCount}`}
          </div>
          <div className="p-1">{day.dailyTask}</div>
          {day.documentsDue && (
            <div className="text-red-900">{day.documentsDue}</div>
          )}
        </div>
      </div>
    </>
  );
};
