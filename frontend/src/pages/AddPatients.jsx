import React, { useState } from 'react';

export default function AddPatient() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    mobile: '',
    address: '',
    email: '',
    visitDate: '',
    referredBy: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:5000/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      alert("Patient added successfully!");
      setFormData({
        name: '',
        age: '',
        gender: '',
        mobile: '',
        address: '',
        email: '',
        visitDate: '',
        referredBy: '',
        notes: ''
      });
    } else {
      alert("Error: " + result.message);
    }
  } catch (err) {
    alert("Server error. Try again.");
    console.error(err);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Add New Patient
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border px-4 py-2 rounded-lg"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              required
              className="w-full border px-4 py-2 rounded-lg"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              required
              className="w-full border px-4 py-2 rounded-lg"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              required
              className="w-full border px-4 py-2 rounded-lg"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              required
              rows="2"
              className="w-full border px-4 py-2 rounded-lg"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Email (optional)</label>
            <input
              type="email"
              name="email"
              className="w-full border px-4 py-2 rounded-lg"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Date of Visit</label>
            <input
              type="date"
              name="visitDate"
              required
              className="w-full border px-4 py-2 rounded-lg"
              value={formData.visitDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Referred By (Doctor)</label>
            <input
              type="text"
              name="referredBy"
              required
              className="w-full border px-4 py-2 rounded-lg"
              value={formData.referredBy}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Notes (optional)</label>
            <textarea
              name="notes"
              rows="2"
              className="w-full border px-4 py-2 rounded-lg"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Save Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
