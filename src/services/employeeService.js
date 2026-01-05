const EMPLOYEE_KEY = "employees";

const defaultEmployees = [
  {
    id: 1,
    fullName: "Rahul Sharma",
    gender: "Male",
    dob: "1995-04-12",
    state: "Telangana",
    isActive: true,
    profileImage: ""
  },
  {
    id: 2,
    fullName: "Anita Verma",
    gender: "Female",
    dob: "1998-09-21",
    state: "Andhra Pradesh",
    isActive: true,
    profileImage: ""
  },
  {
    id: 3,
    fullName: "Vikram Singh",
    gender: "Male",
    dob: "1993-01-10",
    state: "Karnataka",
    isActive: false,
    profileImage: ""
  },
  {
    id: 4,
    fullName: "Pooja Reddy",
    gender: "Female",
    dob: "1997-06-18",
    state: "Tamil Nadu",
    isActive: true,
    profileImage: ""
  },
  {
    id: 5,
    fullName: "Amit Kumar",
    gender: "Male",
    dob: "1992-11-05",
    state: "Maharashtra",
    isActive: false,
    profileImage: ""
  }
];

// Initialize employees only once
export const initializeEmployees = () => {
  const existing = localStorage.getItem(EMPLOYEE_KEY);
  if (!existing) {
    localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(defaultEmployees));
  }
};

export const getEmployees = () => {
  const data = localStorage.getItem(EMPLOYEE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveEmployees = (employees) => {
  localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(employees));
};
