import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/screen/Main";
import ViewMedicalCase from "./components/screen/view/ViewMedicalCase";
import ViewDiagnoses from "./components/screen/view/ViewDiagnoses";
import ViewDoctors from "./components/screen/view/ViewDoctors";
import ViewInsurance from "./components/screen/view/ViewInsurance";
import ViewOperations from "./components/screen/view/ViewOperations";
import ViewResearch from "./components/screen/view/ViewResearch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/view/medical-cases" element={<ViewMedicalCase />} />
        <Route path="/view/diagnoses" element={<ViewDiagnoses />} />
        <Route path="/view/doctors" element={<ViewDoctors />} />
        <Route path="/view/insurance" element={<ViewInsurance />} />
        <Route path="/view/operations" element={<ViewOperations />} />
        <Route path="/view/research" element={<ViewResearch />} />

        {/* <Route path="/view/:id" element={<ViewMedicalCasePage />} />
        <Route path="/add/diagnosis" element={<AddMedicalCasePage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
