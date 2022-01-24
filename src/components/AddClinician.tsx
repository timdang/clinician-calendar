import { useState } from "react";

import { Clinician } from "../features/types";

export interface AddClinicianProps {
  clinician: Clinician;
  onClose: (clinician: Clinician) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

function AddEditClinician({
  clinician,
  onClose,
  onCancel,
  isEditing,
}: AddClinicianProps) {
  const [newClinician, setNewClinician] = useState<Clinician>(clinician);

  const handleChange = (e: any, prop: string) => {
    setNewClinician({ ...newClinician, [prop]: e.target.value });
  };

  return (
    <div className="flex flex-col items-start px-10">
      <div>
        First Name:{" "}
        <input
          className="m-2"
          value={newClinician.firstName}
          onChange={(e) => handleChange(e, "firstName")}
        />
        Last Name:{" "}
        <input
          className="m-2"
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
        Training Days:
        <input
          className="m-2"
          type="number"
          value={newClinician.trainingDays}
          onChange={(e) => handleChange(e, "trainingDays")}
        />
        Color:
        <select
          className="m-2"
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
      <div>
        <button
          className="rounded-lg px-4 py-2 m-2 bg-blue-100 text-blue-800"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="rounded-lg px-4 py-2 m-2 bg-blue-800 text-blue-100 disabled:bg-gray-300 disabled:text-white"
          type="button"
          onClick={() => onClose(newClinician)}
          // disabled={
          //   !newClinician.firstName ||
          //   !newClinician.lastName ||
          //   !newClinician.color ||
          //   !newClinician.startDate
          // }
        >
          {isEditing ? "Edit" : "Add"} Clinician
        </button>
      </div>
    </div>
  );
}

export default AddEditClinician;
