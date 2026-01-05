export default function EmployeeFilter({
  search,
  gender,
  status,
  onSearchChange,
  onGenderChange,
  onStatusChange
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
        aria-label="Search by name"
      />

      <select
        value={gender}
        onChange={(e) => onGenderChange(e.target.value)}
        className="w-full sm:w-40 px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
        aria-label="Filter by gender"
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
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}
