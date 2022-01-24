import "./App.css";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddEditClinician from "./components/AddClinician";
import { ExistingClinician } from "./components/ExistingClinician";
import { Clinician } from "./features/types";
import { mapDays } from "./features/utilities";
import { Calendar } from "./components/Calendar";

function App() {
  const [clinicians, setClinicians] = useState<Clinician[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [holidayCalendar] = useState(["01/01/2022", "07/04/2022"]);
  const onClinicianEdit = (modifiedClinician: Clinician) => {
    modifiedClinician.workDays = mapDays(
      modifiedClinician.startDate,
      modifiedClinician.trainingDays,
      modifiedClinician.daysOff,
      holidayCalendar
    );
    let modifiedClinicians = clinicians.filter(
      (oldClinician) => oldClinician.guid !== modifiedClinician.guid
    );
    modifiedClinicians.push(modifiedClinician);
    setClinicians(modifiedClinicians);
  };

  const onClinicianAdd = (clinician: Clinician) => {
    clinician.guid = uuidv4();
    clinician.workDays = mapDays(
      clinician.startDate,
      clinician.trainingDays,
      clinician.daysOff,
      holidayCalendar
    );
    setClinicians([...clinicians, ...[clinician]]);
  };
  return (
    <div className="App">
      <h1 className="text-3xl font-bold py-4 underline">Clinician Calendar</h1>
      <button
        className="rounded-lg px-4 py-2 m-2 bg-blue-800 text-blue-100"
        type="button"
        onClick={() => setShowAdd(true)}
      >
        + Add Clinician
      </button>
      {showAdd && (
        <AddEditClinician
          clinician={{
            firstName: "",
            lastName: "",
            startDate: "",
            color: "",
            guid: "",
            workDays: [],
            trainingDays: 0,
            daysOff: [],
          }}
          onClose={(clinician) => {
            onClinicianAdd(clinician);
            setShowAdd(false);
          }}
          onCancel={() => setShowAdd(false)}
        />
      )}
      <div className="flex">
        {clinicians.map((clinician) => (
          <div key={clinician.guid} className="w-64 p-3">
            <ExistingClinician
              clinician={clinician}
              onClose={onClinicianEdit}
              onCancel={() => undefined}
            />
          </div>
        ))}
      </div>
      <Calendar clinicians={clinicians} />
    </div>
  );
}

export default App;
