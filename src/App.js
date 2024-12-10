import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// --- LOGIN
import Login from "./utils/Login";
// --- PRIVATE ROUTE
import PrivateRoute from "./utils/PrivateRoutes";
// --- PROVIDERS
import AuthProvider from "./utils/AuthProvider";
// --- VIEW
import MainPage from "./components/screen/Main";
import ViewMedicalCase from "./components/screen/view/ViewMedicalCase";
import ViewDiagnoses from "./components/screen/view/ViewDiagnoses";
import ViewDoctors from "./components/screen/view/ViewDoctors";
import ViewInsurance from "./components/screen/view/ViewInsurance";
import ViewOperations from "./components/screen/view/ViewOperations";
import ViewPatients from "./components/screen/view/ViewPatient";
import ViewBusyDoctors from "./components/screen/view/ViewBusyDoctors";
import ViewBestDoctors from "./components/screen/view/ViewBestDoctors";
import ViewCaseOperations from "./components/screen/view/ViewCaseOperations";
// --- ADD
import AddMedicalCase from "./components/screen/add/AddMedicalCase";
import AddDiagnosis from "./components/screen/add/AddDiagnosis";
import AddDoctor from "./components/screen/add/AddDoctor";
import AddInsurance from "./components/screen/add/AddInsurance";
import AddOperations from "./components/screen/add/AddOperations";
import AddPatient from "./components/screen/add/AddPatient";
import AddCaseOperations from "./components/screen/add/AddCaseOperations";
// --- EDIT
import EditMedicalCase from "./components/screen/edit/EditMedicalCase";
import EditDiagnosis from "./components/screen/edit/EditDiagnosis";
import EditDoctor from "./components/screen/edit/EditDoctor";
import EditInsurance from "./components/screen/edit/EditInsurance";
import EditOperations from "./components/screen/edit/EditOperations";
import EditPatient from "./components/screen/edit/EditPatient";
import EditCaseOperations from "./components/screen/edit/EditCaseOperations";
// --- ASSIGN
import AssignMedicalCase from "./components/screen/assign/AssignMedicalCase";
import AssignOperation from "./components/screen/assign/AssignOperation";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* LOGIN */}
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainPage />} />
            {/* VIEW */}
            <Route path="/view/medical-cases" element={<ViewMedicalCase />} />
            <Route path="/view/diagnoses" element={<ViewDiagnoses />} />
            <Route path="/view/doctors" element={<ViewDoctors />} />
            <Route path="/view/insurance" element={<ViewInsurance />} />
            <Route path="/view/operations" element={<ViewOperations />} />
            <Route path="/view/patients" element={<ViewPatients />} />
            <Route path="/view/best-doctors" element={<ViewBestDoctors />} />
            <Route path="/view/busy-doctors" element={<ViewBusyDoctors />} />
            <Route
              path="/view/case-operations"
              element={<ViewCaseOperations />}
            />
            {/* ADD */}
            <Route path="/add/medical-cases" element={<AddMedicalCase />} />
            <Route path="/add/diagnoses" element={<AddDiagnosis />} />
            <Route path="/add/doctors" element={<AddDoctor />} />
            <Route path="/add/insurance" element={<AddInsurance />} />
            <Route path="/add/operations" element={<AddOperations />} />
            <Route path="/add/patient" element={<AddPatient />} />
            <Route
              path="/add/case-operations"
              element={<AddCaseOperations />}
            />
            {/* EDIT */}
            <Route
              path="/edit/medical-cases/:id"
              element={<EditMedicalCase />}
            />
            <Route path="/edit/diagnoses/:id" element={<EditDiagnosis />} />
            <Route path="/edit/doctors/:id" element={<EditDoctor />} />
            <Route path="/edit/insurance/:id" element={<EditInsurance />} />
            <Route path="/edit/operations/:id" element={<EditOperations />} />
            <Route path="/edit/patient/:id" element={<EditPatient />} />
            <Route
              path="/edit/case-operations/:id"
              element={<EditCaseOperations />}
            />
            {/* ASSIGN */}
            <Route
              path="assign/medical-case/:id"
              element={<AssignMedicalCase />}
            />
            <Route path="/assign/operation/:id" element={<AssignOperation />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
