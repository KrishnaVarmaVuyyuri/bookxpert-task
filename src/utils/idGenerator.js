export const generateEmployeeId = (employees) => {
  if (employees.length === 0) return 1;

  const ids = employees.map(emp => emp.id);
  return Math.max(...ids) + 1;
};
