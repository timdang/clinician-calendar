import "./App.css";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import AddEditClinician from "./components/AddClinician";
import { Calendar } from "./components/Calendar";
import { ExistingClinician } from "./components/ExistingClinician";
import { Clinician } from "./features/types";
import { mapDays } from "./features/utilities";

function App() {
  const c = localStorage.getItem("clinicians");
  let cArray = [];
  if (c) {
    cArray = JSON.parse(c);
  }
  const [clinicians, setClinicians] = useState<Clinician[]>(cArray);
  const [showAdd, setShowAdd] = useState(false);
  const [holidayCalendar] = useState(["01/01/2022", "07/04/2022"]);
  const [activeClinician, setActiveClinician] = useState<Clinician | null>();
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
    localStorage.setItem("clinicians", JSON.stringify(modifiedClinicians));
    setActiveClinician(modifiedClinician);
  };

  const onClinicianAdd = (clinician: Clinician) => {
    clinician.guid = uuidv4();
    clinician.workDays = mapDays(
      clinician.startDate,
      clinician.trainingDays,
      clinician.daysOff,
      holidayCalendar
    );
    const modifiedClinicians = [...clinicians, ...[clinician]];
    setClinicians(modifiedClinicians);
    localStorage.setItem("clinicians", JSON.stringify(modifiedClinicians));
    setActiveClinician(clinician);
  };

  const onDeleteClinician = (deleted: Clinician) => {
    let modifiedClinicians = clinicians.filter(
      (oldClinician) => oldClinician.guid !== deleted.guid
    );
    setClinicians(modifiedClinicians);
    localStorage.setItem("clinicians", JSON.stringify(modifiedClinicians));
    setActiveClinician(null);
  };

  return (
    <div className="App">
      <button
        className="rounded-lg px-4 py-2 m-2 bg-blue-800 text-blue-100 float-right"
        type="button"
        onClick={() => setShowAdd(true)}
      >
        + Add Clinician
      </button>
      <h1 className="text-3xl font-bold py-4 underline">Clinician Calendar</h1>
      {showAdd && (
        <div className="w-1/3 float-right">
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
        </div>
      )}
      <div className="flex">
        {clinicians.map((clinician) => (
          <div key={clinician.guid} className="w-1/3 p-3">
            <ExistingClinician
              clinician={clinician}
              onClose={onClinicianEdit}
              onCancel={() => undefined}
              onDelete={onDeleteClinician}
              onSelect={() => setActiveClinician(clinician)}
            />
          </div>
        ))}
      </div>
      {activeClinician && <Calendar clinician={activeClinician} />}
    </div>
  );
}

export default App;
