import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// --- VIEW
import MainPage from "./components/screen/Main";
import ViewMedicalCase from "./components/screen/view/ViewMedicalCase";
import ViewDiagnoses from "./components/screen/view/ViewDiagnoses";
import ViewDoctors from "./components/screen/view/ViewDoctors";
import ViewInsurance from "./components/screen/view/ViewInsurance";
import ViewOperations from "./components/screen/view/ViewOperations";
import ViewResearch from "./components/screen/view/ViewResearch";
// --- ADD
import AddMedicalCase from "./components/screen/add/AddMedicalCase";
import AddDiagnosis from "./components/screen/add/AddDiagnosis";
import AddDoctor from "./components/screen/add/AddDoctor";
import AddInsurance from "./components/screen/add/AddInsurance";
import AddOperations from "./components/screen/add/AddOperations";
import AddResearch from "./components/screen/add/AddResearch";
// --- Edit
import EditMedicalCase from "./components/screen/edit/EditMedicalCase";
import EditDiagnosis from "./components/screen/edit/EditDiagnosis";
import EditDoctor from "./components/screen/edit/EditDoctor";
import EditInsurance from "./components/screen/edit/EditInsurance";
import EditOperations from "./components/screen/edit/EditOperations";
import EditResearch from "./components/screen/edit/EditResearch";
// --
import ViewBusyDoctors from "./components/screen/view/ViewBusyDoctors";
import ViewBestDoctors from "./components/screen/view/ViewBestDoctors";
function App() {
  return (
    <Router>
      <Routes>
        {/* VIEW */}
        <Route path="/" element={<MainPage />} />
        <Route path="/view/medical-cases" element={<ViewMedicalCase />} />
        <Route path="/view/diagnoses" element={<ViewDiagnoses />} />
        <Route path="/view/doctors" element={<ViewDoctors />} />
        <Route path="/view/insurance" element={<ViewInsurance />} />
        <Route path="/view/operations" element={<ViewOperations />} />
        <Route path="/view/research" element={<ViewResearch />} />
        {/* -- */}
        <Route path="/view/best-doctors" element={<ViewBestDoctors />} />
        <Route path="/view/busy-doctors" element={<ViewBusyDoctors />} />
        {/* ADD */}
        <Route path="/add/medical-cases" element={<AddMedicalCase />} />
        <Route path="/add/diagnoses" element={<AddDiagnosis />} />
        <Route path="/add/doctors" element={<AddDoctor />} />
        <Route path="/add/insurance" element={<AddInsurance />} />
        <Route path="/add/operations" element={<AddOperations />} />
        <Route path="/add/research" element={<AddResearch />} />
        {/* EDIT */}
        <Route path="/edit/medical-cases/:id" element={<EditMedicalCase />} />
        <Route path="/edit/diagnoses/:id" element={<EditDiagnosis />} />
        <Route path="/edit/doctors/:id" element={<EditDoctor />} />
        <Route path="/edit/insurance/:id" element={<EditInsurance />} />
        <Route path="/edit/operations/:id" element={<EditOperations />} />
        <Route path="/edit/research/:id" element={<EditResearch />} />
      </Routes>
    </Router>
  );
}

export default App;
