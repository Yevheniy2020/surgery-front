import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import AddMedicalCasePage from "./pages/add/medical-case/AddMedicalCasePage";
import ViewMedicalCasePage from "./pages/view/ViewMedicalCasePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/view/:id" element={<ViewMedicalCasePage />} />
        <Route path="/add/diagnosis" element={<AddMedicalCasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
