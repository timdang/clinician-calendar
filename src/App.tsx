import "./App.css";

import React, { useState } from "react";

import AddClinician from "./components/AddClinician";
import { Clinician } from "./features/types";
import { mapDays } from "./features/utilities";
import { last } from "lodash-es";

function App() {
  const [clinicians, setClinicians] = useState<Clinician[]>([]);
  const [showAdd, setShowAdd] = useState(false);
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
        <AddClinician
          clinician={{} as Clinician}
          onClose={(clinician) => {
            setClinicians([...clinicians, ...[clinician]]);
            setShowAdd(false);
          }}
          onCancel={() => setShowAdd(false)}
        />
      )}
      {clinicians.map((clinician) => (
        <div key={`${clinician.lastName}${clinician.startDate}`}>
          <span
            className={`font-bold text-${clinician.color}-600`}
            style={{ color: clinician.color }}
          >
            {clinician.firstName} {clinician.lastName}
          </span>
          {last(
            mapDays(clinician, 7, ["01/17/2022", "01/18/2022"], ["01/01/2022"])
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
