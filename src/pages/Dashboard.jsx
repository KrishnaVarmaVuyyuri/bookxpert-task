import { useEffect, useState } from "react";
import EmployeeSummary from "../components/employees/EmployeeSummary";
import EmployeeTable from "../components/employees/EmployeeTable";

import {
  getEmployees,
  saveEmployees,
  initializeEmployees
} from "../services/employeeService";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    initializeEmployees();
    setEmployees(getEmployees());
  }, []);

  const updateEmployee = (updatedEmp) => {
    const updatedList = employees.map((emp) =>
      emp.id === updatedEmp.id ? updatedEmp : emp
    );
    setEmployees(updatedList);
    saveEmployees(updatedList);
  };

  const deleteEmployee = (id) => {
    const updatedList = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedList);
    saveEmployees(updatedList);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Management Dashboard</h1>

      <EmployeeSummary employees={employees} />

      <EmployeeTable
        employees={employees}
        onUpdate={updateEmployee}
        onDelete={deleteEmployee}
      />
    </div>
  );
}
