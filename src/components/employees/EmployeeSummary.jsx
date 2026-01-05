export default function EmployeeSummary({ employees }) {
  const total = employees.length;
  const active = employees.filter(emp => emp.isActive).length;
  const inactive = total - active;

  return (
    <div className="flex flex-wrap gap-5 mb-5">
      <SummaryCard title="Total Employees" value={total} />
      <SummaryCard title="Active Employees" value={active} />
      <SummaryCard title="Inactive Employees" value={inactive} />
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="p-5 rounded-md bg-gray-100 min-w-50 flex-1">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
