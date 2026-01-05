import { useEffect, useState } from "react";

const statesList = [
  "Telangana",
  "Andhra Pradesh",
  "Karnataka",
  "Tamil Nadu",
  "Maharashtra"
];

export default function EmployeeForm({ onSave, onCancel, initialData }) {
  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    dob: "",
    state: "",
    isActive: true,
    profileImage: ""
  });

  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});

  // Prefill form for EDIT
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setPreview(initialData.profileImage);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
      setForm({ ...form, profileImage: imageURL });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Name is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.dob) newErrors.dob = "DOB is required";
    if (!form.state) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-6 border border-gray-200 rounded-md bg-white flex flex-col gap-3">
      <h2 className="text-xl font-semibold mb-2">{initialData ? "Edit Employee" : "Add Employee"}</h2>

      {/* Full Name */}
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {errors.fullName && <span className="text-sm text-red-600">{errors.fullName}</span>}

      {/* Gender */}
      <select name="gender" value={form.gender} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none">
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      {errors.gender && <span className="text-sm text-red-600">{errors.gender}</span>}

      {/* DOB */}
      <input type="date" name="dob" value={form.dob} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none" />
      {errors.dob && <span className="text-sm text-red-600">{errors.dob}</span>}

      {/* State */}
      <select name="state" value={form.state} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none">
        <option value="">Select State</option>
        {statesList.map((st) => (
          <option key={st}>{st}</option>
        ))}
      </select>
      {errors.state && <span className="text-sm text-red-600">{errors.state}</span>}

      {/* Image Upload */}
      <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-gray-700" />

      {preview && (
        <img src={preview} alt="Preview" className="w-20 h-20 rounded-full object-cover mx-auto" />
      )}

      {/* Status */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <span>Active</span>
      </label>

      {/* Actions */}
      <div className="flex gap-3 mt-3">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200">Cancel</button>
      </div>
    </form>
  );
}


