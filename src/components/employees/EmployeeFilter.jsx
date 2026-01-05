import { useEffect, useState } from "react";
import Spinner from "../Spinner";

export default function EmployeeFilter({
  search,
  gender,
  status,
  onSearchChange,
  onGenderChange,
  onStatusChange,
  loading = false
}) {
  const [local, setLocal] = useState(search);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setLocal(search);
  }, [search]);

  useEffect(() => {
    setSearching(true);
    const t = setTimeout(() => {
      onSearchChange(local);
      setSearching(false);
    }, 300);
    return () => clearTimeout(t);
  }, [local]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search by name"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
          aria-label="Search by name"
          disabled={loading}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {searching && <Spinner size={4} className="text-gray-400" />}
        </div>
      </div>

      <select
        value={gender}
        onChange={(e) => onGenderChange(e.target.value)}
        className="w-full sm:w-40 px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
        aria-label="Filter by gender"
        disabled={loading}
      >
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-full sm:w-40 px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
        aria-label="Filter by status"
        disabled={loading}
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}
