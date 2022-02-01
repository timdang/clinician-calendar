import { useState } from "react";

import { Clinician } from "../features/types";
import { AddTimeOff } from "./AddTimeOff";

export interface AddClinicianProps {
  clinician: Clinician;
  onClose: (clinician: Clinician) => void;
  onCancel: () => void;
  onDelete?: (clinician: Clinician) => void;
  isEditing?: boolean;
  onSelect?: () => void;
}

function AddEditClinician({
  clinician,
  onClose,
  onCancel,
  isEditing,
  onDelete,
}: AddClinicianProps) {
  const [newClinician, setNewClinician] = useState<Clinician>(clinician);

  const handleChange = (e: any, prop: string) => {
    setNewClinician({ ...newClinician, [prop]: e.target.value });
  };

  return (
    <div className="grid grid-flow-row">
      <div>
        First:{" "}
        <input
          className="m-2 w-1/2"
          value={newClinician.firstName}
          onChange={(e) => handleChange(e, "firstName")}
        />
      </div>
      <div>
        Last:{" "}
        <input
          className="m-2 w-1/2"
          value={newClinician.lastName}
          onChange={(e) => handleChange(e, "lastName")}
        />
      </div>
      <div>
        Start Date:
        <input
          className="m-2"
          type="date"
          value={newClinician.startDate}
          onChange={(e) => handleChange(e, "startDate")}
        />
        <div>
          Training Days:
          <input
            className="m-2 w-1/4"
            type="number"
            value={newClinician.trainingDays}
            onChange={(e) => handleChange(e, "trainingDays")}
          />
        </div>
        <div>
          Color:
          <select
            className="m-2 w-1/2"
            name="color"
            value={newClinician.color}
            onChange={(e) => handleChange(e, "color")}
          >
            <option value=""></option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="rebeccapurple">Purple</option>
            <option value="red">Red</option>
          </select>
        </div>
      </div>
      <div>
        <AddTimeOff
          days={newClinician.daysOff}
          onClose={(e) => setNewClinician({ ...newClinician, daysOff: e })}
        />
      </div>
      <div className="flex justify-between">
        {onDelete && (
          <button
            className="mr-8 text-red-800"
            type="button"
            onClick={() => onDelete(newClinician)}
          >
            Delete
          </button>
        )}
        {!isEditing && (
          <button
            className="px-4 py-2 text-blue-800"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button
          className="rounded-lg px-4 py-1 m-2 bg-blue-800 text-blue-100 disabled:bg-gray-300 disabled:text-white"
          type="button"
          onClick={() => onClose(newClinician)}
          disabled={
            !newClinician.firstName ||
            !newClinician.lastName ||
            !newClinician.color ||
            !newClinician.startDate
          }
        >
          {isEditing ? "Save" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default AddEditClinician;
