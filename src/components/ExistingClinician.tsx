import { last } from "lodash-es";
import { useState } from "react";

import AddEditClinician, { AddClinicianProps } from "./AddClinician";

export const ExistingClinician = ({
  clinician,
  onClose,
  onCancel,
}: AddClinicianProps) => {
  const [isEditingClinician, setIsEditingClinician] = useState(false);
  if (!clinician) return <></>;

  return isEditingClinician ? (
    <AddEditClinician
      clinician={clinician}
      onClose={(editedClinician) => {
        setIsEditingClinician(false);
        onClose(editedClinician);
      }}
      onCancel={() => setIsEditingClinician(false)}
      isEditing
    />
  ) : (
    <div className="rounded border-solid border border-neutral-400 h-20">
      <div>
        <span className="font-bold" style={{ color: clinician.color }}>
          {clinician.firstName} {clinician.lastName}
        </span>{" "}
        <button
          className="rounded-lg px-1  text-blue-600"
          type="button"
          onClick={() => setIsEditingClinician(true)}
        >
          Edit
        </button>
      </div>
      <div>Last Training: {last(clinician.workDays)?.toLocaleDateString()}</div>
    </div>
  );
};
