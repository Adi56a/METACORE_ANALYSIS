import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export default function AddPatient() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",
    email: "",
    visitDate: "",
    referredBy: "",
    notes: "",
    selectedTests: [], // <-- store selected test IDs here
  });

  const [testsOptions, setTestsOptions] = useState([]);
  const [loadingTests, setLoadingTests] = useState(false);
  const [errorTests, setErrorTests] = useState(null);

  // Fetch tests on mount
  useEffect(() => {
    const fetchTests = async () => {
      setLoadingTests(true);
      try {
        const res = await fetch("http://localhost:5000/api/view-tests");
        const data = await res.json();
        if (data.success) {
          // Format for react-select options: label and value
          const options = data.tests.map((test) => ({
            value: test.test_id,
            label: `${test.name} (₹${test.price.toFixed(2)})`,
          }));
          setTestsOptions(options);
          setErrorTests(null);
        } else {
          setErrorTests("Failed to load tests");
        }
      } catch (err) {
        setErrorTests("Error fetching tests");
      } finally {
        setLoadingTests(false);
      }
    };

    fetchTests();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle multi-select change
  const handleTestsChange = (selectedOptions) => {
    setFormData({
      ...formData,
      selectedTests: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: at least one test selected
    if (!formData.selectedTests.length) {
      alert("Please select at least one test.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/add-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        navigate("/patients");
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      alert("Server error. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-10">
        <header className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
            Add New Patient
          </h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded"></div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
          noValidate
        >
          {/* Existing fields here (name, age, gender, mobile, etc.) */}
          {/* ... your existing inputs unchanged ... */}
          
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-semibold text-gray-700"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Full name"
            />
          </div>

          {/* Age */}
          <div>
            <label
              htmlFor="age"
              className="block mb-2 font-semibold text-gray-700"
            >
              Age <span className="text-red-500">*</span>
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min="0"
              required
              value={formData.age}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Age in years"
            />
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block mb-2 font-semibold text-gray-700"
            >
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Mobile */}
          <div>
            <label
              htmlFor="mobile"
              className="block mb-2 font-semibold text-gray-700"
            >
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              required
              value={formData.mobile}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="e.g. +1 234 567 890"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label
              htmlFor="address"
              className="block mb-2 font-semibold text-gray-700"
            >
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              required
              rows="3"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-3 resize-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Full address"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700"
            >
              Email (optional)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="example@mail.com"
            />
          </div>

          {/* Date of Visit */}
          <div>
            <label
              htmlFor="visitDate"
              className="block mb-2 font-semibold text-gray-700"
            >
              Date of Visit <span className="text-red-500">*</span>
            </label>
            <input
              id="visitDate"
              name="visitDate"
              type="date"
              required
              value={formData.visitDate}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Referred By */}
          <div>
            <label
              htmlFor="referredBy"
              className="block mb-2 font-semibold text-gray-700"
            >
              Referred By (Doctor) <span className="text-red-500">*</span>
            </label>
            <input
              id="referredBy"
              name="referredBy"
              type="text"
              required
              value={formData.referredBy}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Doctor's name"
            />
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label
              htmlFor="notes"
              className="block mb-2 font-semibold text-gray-700"
            >
              Notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-3 resize-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Additional patient notes"
            />
          </div>

          {/* New: Drop test multi-select */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold text-gray-700">
              Select Tests to Perform <span className="text-red-500">*</span>
            </label>
            {loadingTests ? (
              <p className="text-gray-500">Loading tests...</p>
            ) : errorTests ? (
              <p className="text-red-500">{errorTests}</p>
            ) : (
              <Select
                isMulti
                options={testsOptions}
                onChange={handleTestsChange}
                placeholder="Select tests..."
                className="react-select-container"
                classNamePrefix="react-select"
                noOptionsMessage={() => "No tests found"}
              />
            )}
          </div>

          {/* Submit button */}
          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
            >
              Save Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
