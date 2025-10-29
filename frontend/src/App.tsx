// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LogsPage from "./pages/LogsPage";
import PerformancePage from "./pages/PerformancePage";
import EmployeesPage from "./pages/EmployeesPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LogsPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/employees" element={<EmployeesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
