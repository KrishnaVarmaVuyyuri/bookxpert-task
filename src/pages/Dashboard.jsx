import { useEffect, useState } from "react";
import EmployeeSummary from "../components/employees/EmployeeSummary";
import EmployeeTable from "../components/employees/EmployeeTable";
import EmployeeForm from "../components/employees/EmployeeForm";
import Modal from "../components/Model";
import { generateEmployeeId } from "../utils/idGenerator";
import {
  getEmployees,
  saveEmployees,
  initializeEmployees
} from "../services/employeeService";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

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

const handleSave = (employee) => {
  let updatedList;

  if (editingEmployee) {
    updatedList = employees.map((emp) =>
      emp.id === editingEmployee.id
        ? { ...employee, id: emp.id }
        : emp
    );
  } else {
    const newId = generateEmployeeId(employees);
    updatedList = [...employees, { ...employee, id: newId }];
  }

  setEmployees(updatedList);
  saveEmployees(updatedList);
  setShowForm(false);
  setEditingEmployee(null);
};

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Employee Management Dashboard</h1>
        <button onClick={() => setShowForm(true)} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          Add Employee
        </button>
      </div>

      {showForm && (
        <Modal
          onClose={() => {
            setShowForm(false);
            setEditingEmployee(null);
          }}
        >
          <EmployeeForm
            initialData={editingEmployee}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingEmployee(null);
            }}
          />
        </Modal>
      )}



      <EmployeeSummary employees={employees} />

      <EmployeeTable
        employees={employees}
        onUpdate={updateEmployee}
        onDelete={deleteEmployee}
        onEdit={(emp) => { setEditingEmployee(emp); setShowForm(true); }}
      />
    </div>
  );
}
