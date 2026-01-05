Employee Management Dashboard
---------------Project Overview-------------

The Employee Management Dashboard is a React-based web application that allows users to manage employee records efficiently.
It includes authentication, employee CRUD operations, search & filtering, and a clean dashboard summary.

The application uses mock authentication and localStorage for data persistence, making it lightweight and easy to run without a backend.

-------------Tech Stack Used--------------

Frontend: React+Vite (Functional Components & Hooks)

Routing: React Router DOM

State Management: React useState, useEffect

Styling: Tailwind CSS

Data Storage: Browser localStorage

Build Tool: Vite / Create React App (based on setup)

---------Features----------------------

Login with mock authentication

Protected Dashboard route

Dashboard summary:

Total employees

Active / Inactive count

Employee Management:

Add employee

Edit employee

Delete employee (with confirmation)

Active / Inactive toggle

Profile image upload with preview

Search employees by name

Filter by gender and active status (combined filtering)

Empty state handling when no records found

Print employee list

Reusable modal-based employee form

--------------Steps to Run the Project Locally----------------

Clone the repository

git clone <>

Navigate to project directory

cd employee-dashboard


Install dependencies

npm install


Start the development server

npm run dev


or (if using CRA)

npm start


Open in browser

http://localhost:5173


or

http://localhost:3000

-------------Assumptions & Design Decisions----------------

Authentication is mock-based and stored in localStorage

Employee data is persisted using localStorage (no backend)

Default employee records are initialized only once

A single reusable form is used for Add & Edit operations

Incremental numeric IDs (1, 2, 3…) are used for simplicity

Printing is restricted to the employee table using print-specific CSS

Focus was on clarity, usability, and clean code rather than over-engineering

-------------------Screen Recording-----------------------

The screen recording demonstrates:

Login flow

Dashboard overview

Add / Edit / Delete employee

Image upload preview

Search & filter functionality

Print employee list
 ---------Conclusion-----------------

This project demonstrates practical React skills, component reusability, state management, and UI/UX best practices suitable for real-world dashboards and frontend assignments.
