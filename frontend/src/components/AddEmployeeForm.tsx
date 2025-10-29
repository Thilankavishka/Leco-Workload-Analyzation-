// src/components/AddEmployeeForm.tsx
import React, { useState } from "react";
import type { NewEmployee } from "../types";

interface AddEmployeeFormProps {
  onAdd: (newEmployee: NewEmployee) => void;
}

function AddEmployeeForm({ onAdd }: AddEmployeeFormProps) {
  const [name, setName] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [joinDate, setJoinDate] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, department, salary: Number(salary), join_date: joinDate });
    setName("");
    setDepartment("");
    setSalary("");
    setJoinDate("");
  };

  return (
    <div>
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Department:
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </label>
        <label>
          Salary:
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </label>
        <label>
          Join Date:
          <input
            type="date"
            value={joinDate}
            onChange={(e) => setJoinDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployeeForm;
