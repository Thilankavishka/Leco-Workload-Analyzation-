// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Analyzing from "./pages/Analyzing.tsx";
import BlockDetails from "./pages/BlockDetails.tsx";
import DeepComparison from "./pages/DeepComparison.tsx";
import EmployeeDetails from "./pages/EmployeeDetails.tsx";
import "./App.css";
import Header from "./components/header.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <div >
        <Header />
        <div className="">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analyzing" element={<Analyzing />} />
            <Route path="/block-details/:blockId" element={<BlockDetails />} />
            <Route
              path="/deep-comparison/:blockId"
              element={<DeepComparison />}
            />
            <Route path="/employee/:employeeId" element={<EmployeeDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
