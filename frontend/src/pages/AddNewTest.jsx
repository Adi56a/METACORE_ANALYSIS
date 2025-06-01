import React, { useState } from 'react';
import ViewLabTests from '../components/ViewLabTest';

export default function AddLabTest() {
  const [formData, setFormData] = useState({ name: '', price: '' });
  const [tests, setTests] = useState([]);
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: string }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);

    try {
      const response = await fetch("http://localhost:5000/api/add-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setNotification({ type: "success", message: `Test added successfully: ${result.test.name}` });
        setTests((prev) => [result.test, ...prev]);
        setFormData({ name: '', price: '' });
      } else {
        setNotification({ type: "error", message: result.message || "Failed to add test." });
      }
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Server error. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-xl mx-auto bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center tracking-tight">
          Add New Lab Test
        </h2>

        {notification && (
          <div
            className={`mb-6 rounded-md px-4 py-3 text-center text-sm font-medium ${
              notification.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
            role="alert"
          >
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Test Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., CBC, LFT"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Test Price (₹)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 500"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="inline-block w-full md:w-auto bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition"
            >
              Save Test
            </button>
          </div>
        </form>
      </div>

      <ViewLabTests tests={tests} setTests={setTests} />
    </div>
  );
}
