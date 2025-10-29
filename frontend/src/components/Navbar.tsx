// src/components/Navbar.tsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#f0f0f0" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "20px" }}>
        <li>
          <Link to="/">Logs</Link>
        </li>
        <li>
          <Link to="/performance">Performance</Link>
        </li>
        <li>
          <Link to="/employees">Employees</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
