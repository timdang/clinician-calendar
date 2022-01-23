import { useState } from "react";
import { Clinician, ClinicianColor } from "../features/types";

export interface AddClinicianProps {
  clinician: Clinician;
  onClose: (clinician: Clinician) => void;
  onCancel: () => void;
}

function AddClinician({ clinician, onClose, onCancel }: AddClinicianProps) {
  const [newClinician, setNewClinician] = useState(clinician);
  return (
    <div className="flex flex-col items-start px-10">
      <div>
        First Name:{" "}
        <input
          className="m-2"
          value={clinician.firstName}
          onChange={(e) =>
            setNewClinician({ ...newClinician, firstName: e.target.value })
          }
        />
        Last Name:{" "}
        <input
          className="m-2"
          value={clinician.lastName}
          onChange={(e) =>
            setNewClinician({ ...newClinician, lastName: e.target.value })
          }
        />
        Start Date:
        <input
          className="m-2"
          type="date"
          value={clinician.startDate}
          onChange={(e) =>
            setNewClinician({ ...newClinician, startDate: e.target.value })
          }
        />
      </div>
      <div>
        Color:
        <input
          className="m-2"
          type="text"
          name="city"
          list="cityname"
          value={clinician.color}
          onChange={(e) =>
            setNewClinician({
              ...newClinician,
              color: e.target.value as ClinicianColor,
            })
          }
        />
        <datalist id="cityname">
          <option value="green" />
          <option value="blue" />
          <option value="rebeccapurple" />
          <option value="red" />
        </datalist>
        <button
          className="rounded-lg px-4 py-2 m-2 bg-blue-100 text-blue-800"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="rounded-lg px-4 py-2 m-2 bg-blue-800 text-blue-100"
          type="button"
          onClick={() => onClose(newClinician)}
        >
          Add Clinician
        </button>
      </div>
    </div>
  );
}

export default AddClinician;
