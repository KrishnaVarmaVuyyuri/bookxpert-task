export default function EmployeeSummary({ employees, loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  const total = employees.length;
  const active = employees.filter(emp => emp.isActive).length;
  const inactive = total - active;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
      <SummaryCard title="Total Employees" value={total} />
      <SummaryCard title="Active Employees" value={active} />
      <SummaryCard title="Inactive Employees" value={inactive} />
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="p-5 rounded-md bg-gray-100 w-full animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="p-5 rounded-md bg-gray-100 w-full">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
