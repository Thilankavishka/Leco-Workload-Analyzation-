import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex gap-4">
      <Link to="/">Dashboard</Link>
      <Link to="/blocks">Blocks</Link>
      <Link to="/employees">Employees</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/performance">Performance</Link>
    </nav>
  );
}
