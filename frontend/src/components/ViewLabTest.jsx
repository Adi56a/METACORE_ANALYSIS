import React, { useEffect, useState } from 'react';

export default function ViewLabTests({ tests, setTests }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/view-tests");
        const data = await response.json();
        if (data.success) {
          setTests(data.tests);
        } else {
          console.error("Failed to fetch tests:", data.message);
          setTests([]);
        }
      } catch (error) {
        console.error("Error fetching tests:", error);
        setTests([]);
      } finally {
        setLoading(false);
      }
    };

    if (!tests.length) {
      fetchTests();
    }
  }, [tests, setTests]);

  if (loading) {
    return (
      <p className="mt-12 text-center text-blue-600 font-medium animate-pulse">
        Loading lab tests...
      </p>
    );
  }

  if (!tests.length) {
    return (
      <p className="mt-12 text-center text-gray-500 italic">
        No lab tests available.
      </p>
    );
  }

  return (
    <section className="max-w-4xl mx-auto mt-12 px-2">
      <h3 className="text-2xl font-semibold mb-6 text-blue-700 text-center tracking-wide">
        Available Lab Tests
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tests.map((test) => (
          <div
            key={test.test_id}
            className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600 hover:shadow-xl transition cursor-default"
          >
            <h4 className="text-xl font-bold text-gray-900 mb-1">{test.name}</h4>
            <p className="text-sm text-gray-600 mb-1">
              Test ID: <span className="font-mono">{test.test_id}</span>
            </p>
            <p className="text-lg font-semibold text-blue-700">
              ₹{test.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
