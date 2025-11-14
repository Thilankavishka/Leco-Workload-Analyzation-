import { useState } from "react";

type Props = { onSubmit: (data: any) => void };
export default function BlockForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [employeesCount, setEmployeesCount] = useState(0);
  const [vehiclesCount, setVehiclesCount] = useState(0);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, employeesCount, vehiclesCount });
      }}
      className="flex flex-col gap-2"
    >
      <input
        className="border p-2"
        placeholder="Block Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2"
        type="number"
        placeholder="Employees Count"
        value={employeesCount}
        onChange={(e) => setEmployeesCount(Number(e.target.value))}
      />
      <input
        className="border p-2"
        type="number"
        placeholder="Vehicles Count"
        value={vehiclesCount}
        onChange={(e) => setVehiclesCount(Number(e.target.value))}
      />
      <button className="bg-blue-500 text-white py-2 rounded">Save</button>
    </form>
  );
}
