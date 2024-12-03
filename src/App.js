import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "pages/MainPage";
import ViewMedicalCasePage from "pages/view/ViewMedicalCasePage";
import ViewDiagnosesPage from "pages/view/ViewDiagnosesPage";
import ViewDoctorsPage from "pages/view/ViewDoctorsPage";
import ViewInsurancePage from "pages/view/ViewInsurancePage";
import ViewOperationsPage from "pages/view/ViewOperationsPage";
import ViewResearchPage from "pages/view/ViewResearchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/view/medical-cases" element={<ViewMedicalCasePage />} />
        <Route path="/view/diagnoses" element={<ViewDiagnosesPage />} />
        <Route path="/view/doctors" element={<ViewDoctorsPage />} />
        <Route path="/view/insurance" element={<ViewInsurancePage />} />
        <Route path="/view/operations" element={<ViewOperationsPage />} />
        <Route path="/view/research" element={<ViewResearchPage />} />

        {/* <Route path="/view/:id" element={<ViewMedicalCasePage />} />
        <Route path="/add/diagnosis" element={<AddMedicalCasePage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
