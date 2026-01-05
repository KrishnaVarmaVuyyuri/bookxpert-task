import { useState } from "react";
import Spinner from "../Spinner";

export default function EmployeeTable({ employees, onUpdate, onDelete, onEdit, loading = false }) {
    const [loadingIds, setLoadingIds] = useState(new Set());

    const toggleStatus = async (employee) => {
        setLoadingIds(prev => new Set(prev).add(employee.id));
        try {
          const res = onUpdate({ ...employee, isActive: !employee.isActive });
          if (res && res.then) await res;
        } finally {
          setLoadingIds(prev => {
            const copy = new Set(prev);
            copy.delete(employee.id);
            return copy;
          });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this employee?")) return;
        setLoadingIds(prev => new Set(prev).add(id));
        try {
          const res = onDelete(id);
          if (res && res.then) await res;
        } finally {
          setLoadingIds(prev => {
            const copy = new Set(prev);
            copy.delete(id);
            return copy;
          });
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
      // show skeletons
      return (
        <>
          <div className="sm:hidden">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm p-4 mb-3 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 animate-pulse">
                    <td className="px-4 py-3 text-sm text-gray-700"><div className="h-3 bg-gray-200 rounded w-8"></div></td>
                    <td className="px-4 py-3"><div className="w-10 h-10 rounded-full bg-gray-200" /></td>
                    <td className="px-4 py-3 text-sm text-gray-900"><div className="h-3 bg-gray-200 rounded w-32"></div></td>
                    <td className="px-4 py-3 text-sm text-gray-700"><div className="h-3 bg-gray-200 rounded w-12"></div></td>
                    <td className="px-4 py-3 text-sm text-gray-700"><div className="h-3 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-4 py-3 text-sm text-gray-700"><div className="h-3 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-4 py-3 text-sm text-gray-700"><div className="h-3 bg-gray-200 rounded w-12"></div></td>
                    <td className="px-4 py-3 text-sm"><div className="h-3 bg-gray-200 rounded w-24"></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    }

    if (!employees || employees.length === 0) {
      return (
        <div className="p-6 text-center">
          <div className="text-4xl">📭</div>
          <p className="mt-3 text-lg font-medium text-gray-700">No employees found</p>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
        </div>
      );
    }

    return (
      <>
        {/* Mobile cards */}
        <div className="sm:hidden">
          {employees.map((emp) => (
            <div key={emp.id} className="bg-white rounded-lg shadow-sm p-4 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={emp.profileImage || "https://via.placeholder.com/40"}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{emp.fullName}</div>
                  <div className="text-xs text-gray-500">{emp.gender} • {emp.state}</div>
                  <div className="text-xs text-gray-400">{emp.dob}</div>
                </div>
                <div className="text-sm font-medium text-gray-700">
                  {loadingIds.has(emp.id) ? <Spinner size={4} /> : (emp.isActive ? 'Active' : 'Inactive')}
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button disabled={loadingIds.has(emp.id)} onClick={() => onEdit && onEdit(emp)} className="flex-1 text-indigo-600 hover:text-indigo-800 border rounded-md px-2 py-1">{loadingIds.has(emp.id) ? <Spinner size={4} /> : 'Edit'}</button>
                <button disabled={loadingIds.has(emp.id)} onClick={() => handleDelete(emp.id)} className="flex-1 text-red-600 hover:text-red-800 border rounded-md px-2 py-1">{loadingIds.has(emp.id) ? <Spinner size={4} /> : 'Delete'}</button>
                <button disabled={loadingIds.has(emp.id)} onClick={handlePrint} className="flex-1 text-gray-600 hover:text-gray-800 border rounded-md px-2 py-1">Print</button>
              </div>
            </div>
          ))}
        </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{emp.id}</td>

                        <td className="px-4 py-3">
                            <img
                                src={emp.profileImage || "https://via.placeholder.com/40"}
                                alt="profile"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        </td>

                        <td className="px-4 py-3 text-sm text-gray-900">{emp.fullName}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{emp.gender}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{emp.dob}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{emp.state}</td>

                        <td className="px-4 py-3 text-sm text-gray-700 flex items-center">
                            {loadingIds.has(emp.id) ? (
                              <Spinner size={4} />
                            ) : (
                              <>
                                <input
                                  type="checkbox"
                                  checked={emp.isActive}
                                  onChange={() => toggleStatus(emp)}
                                  className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                                <span>{emp.isActive ? "Active" : "Inactive"}</span>
                              </>
                            )}
                        </td>

                        <td className="px-4 py-3 text-sm">


                            <button disabled={loadingIds.has(emp.id)} onClick={() => onEdit && onEdit(emp)} className="text-indigo-600 hover:text-indigo-800 mr-2 border rounded-md px-1 cursor-pointer">{loadingIds.has(emp.id) ? <Spinner size={4} /> : 'Edit'}</button>
                            <button disabled={loadingIds.has(emp.id)} onClick={() => handleDelete(emp.id)} className="text-red-600 hover:text-red-800 mr-2 border rounded-md px-1 cursor-pointer">{loadingIds.has(emp.id) ? <Spinner size={4} /> : 'Delete'}</button>
                            <button disabled={loadingIds.has(emp.id)} onClick={handlePrint} className="text-gray-600 hover:text-gray-800 border rounded-md px-1 cursor-pointer">Print</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </>
    );
}
