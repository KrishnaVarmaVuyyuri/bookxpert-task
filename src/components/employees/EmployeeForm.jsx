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
    <div className="bg-white rounded-xl">
     

      {/* Form Content */}
      <div className="px-6 py-5 space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter full name"
            value={form.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 rounded-lg border transition-all ${
              errors.fullName
                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            } outline-none`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <span>⚠</span> {errors.fullName}
            </p>
          )}
        </div>

        {/* Gender and DOB Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Gender */}
          <div className="space-y-1.5">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 rounded-lg border transition-all ${
                errors.gender
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              } outline-none bg-white cursor-pointer`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <span>⚠</span> {errors.gender}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 rounded-lg border transition-all ${
                errors.dob
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              } outline-none cursor-pointer`}
            />
            {errors.dob && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <span>⚠</span> {errors.dob}
              </p>
            )}
          </div>
        </div>

        {/* State */}
        <div className="space-y-1.5">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State <span className="text-red-500">*</span>
          </label>
          <select
            id="state"
            name="state"
            value={form.state}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 rounded-lg border transition-all ${
              errors.state
                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            } outline-none bg-white cursor-pointer`}
          >
            <option value="">Select State</option>
            {statesList.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
          {errors.state && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <span>⚠</span> {errors.state}
            </p>
          )}
        </div>

        {/* Profile Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Profile Image
          </label>

          <div className="flex items-center gap-4">
            {preview ? (
              <div className="relative group">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100 shadow-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs">Change</span>
                </div>
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}

            <label className="flex-1">
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="px-4 py-2.5 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 border-dashed rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-100 transition-all text-center">
                <span className="text-sm font-medium text-indigo-700">Choose File</span>
                <p className="text-xs text-gray-500 mt-0.5">PNG, JPG up to 2MB</p>
              </div>
            </label>
          </div>
          {errors.profileImage && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <span>⚠</span> {errors.profileImage}
            </p>
          )}
        </div>

        {/* Active Status */}
        <div className="pt-1">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-500 transition-all"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
              Active Status
            </span>
          </label>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3 rounded-b-xl">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          Save Employee
        </button>
        <button
          onClick={onCancel}
          className="px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:ring-4 focus:ring-gray-100 transition-all cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}


