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
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  // Prefill form for EDIT
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setPreview(initialData.profileImage);
      setImageFile(null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 3) return "Name must be at least 3 characters";
        return "";
      case "gender":
        if (!value) return "Gender is required";
        return "";
      case "dob":
        if (!value) return "DOB is required";
        const d = new Date(value);
        const today = new Date();
        if (d > today) return "DOB cannot be in the future";
        return "";
      case "state":
        if (!value) return "State is required";
        return "";
      case "profileImage":
        if (imageFile) {
          if (!imageFile.type.startsWith("image/")) return "Invalid image file";
          const max = 2 * 1024 * 1024; // 2MB
          if (imageFile.size > max) return "Image must be less than 2MB";
        }
        return "";
      default:
        return "";
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, profileImage: "Invalid image file" }));
        return;
      }

      const max = 2 * 1024 * 1024; // 2MB
      if (file.size > max) {
        setErrors((prev) => ({ ...prev, profileImage: "Image must be less than 2MB" }));
        return;
      }

      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
      setForm({ ...form, profileImage: imageURL });
      setImageFile(file);
      setErrors((prev) => ({ ...prev, profileImage: "" }));
    }
  };

  const validate = () => {
    const fields = ["fullName", "gender", "dob", "state", "profileImage"];
    const newErrors = {};

    fields.forEach((f) => {
      const val = f === "profileImage" ? form.profileImage : form[f];
      const err = validateField(f, val);
      if (err) newErrors[f] = err;
    });

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
        id="fullName"
        name="fullName"
        placeholder="Full Name*"
        value={form.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={!!errors.fullName}
        aria-describedby={errors.fullName ? "fullName-error" : undefined}
        className={`w-full px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.fullName && <span id="fullName-error" className="text-sm text-red-600">{errors.fullName}</span> }

      {/* Gender */}
      <select id="gender" name="gender" value={form.gender} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.gender} aria-describedby={errors.gender ? "gender-error" : undefined} className={`w-full px-4 py-2 rounded focus:outline-none ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}>
        <option value="">Select Gender*</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      {errors.gender && <span id="gender-error" className="text-sm text-red-600">{errors.gender}</span> }

      {/* DOB */}
      <input id="dob" type="date" name="dob" value={form.dob} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.dob} aria-describedby={errors.dob ? "dob-error" : undefined} className={`w-full px-4 py-2 rounded focus:outline-none ${errors.dob ? 'border-red-500' : 'border-gray-300'}`} />
      {errors.dob && <span id="dob-error" className="text-sm text-red-600">{errors.dob}</span>}

      {/* State */}
      <select id="state" name="state" value={form.state} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.state} aria-describedby={errors.state ? "state-error" : undefined} className={`w-full px-4 py-2 rounded focus:outline-none ${errors.state ? 'border-red-500' : 'border-gray-300'}`}>
        <option value="">Select State*</option>
        {statesList.map((st) => (
          <option key={st}>{st}</option>
        ))}
      </select>
      {errors.state && <span id="state-error" className="text-sm text-red-600">{errors.state}</span>}

      {/* Image Upload */}
      <label>Upload Profile Image</label>
      <input id="profileImage" type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-gray-700 border border-dotted rounded p-2 cursor-pointer" aria-describedby={errors.profileImage ? 'profileImage-error' : undefined} />
      {errors.profileImage && <span id="profileImage-error" className="text-sm text-red-600">{errors.profileImage}</span>}

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


