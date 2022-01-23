import "./App.css";

import React, { useState } from "react";

import AddClinician from "./components/AddClinician";
import { Clinician } from "./features/types";

function App() {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div className="App">
      <h1 className="text-3xl font-bold py-4 underline">Clinician Calendar</h1>
      <button
        className="rounded-lg px-4 py-2 m-2 bg-blue-100 text-blue-800"
        type="button"
        onClick={() => setShowAdd(true)}
      >
        + Add Clinician
      </button>
      {showAdd && (
        <AddClinician
          clinician={{} as Clinician}
          onClose={(clinician) => {
            console.log("c", clinician);
            setShowAdd(false);
          }}
          onCancel={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}

export default App;
