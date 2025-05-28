import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/patients')
      .then(res => {
        setPatients(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="text-3xl font-bold text-cyan-400 text-center border-b border-cyan-500 pb-4 mb-6">
        🧪 Pathology Lab Dashboard
      </header>

      {loading ? (
        <div className="text-center text-lg">Loading patient data...</div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyan-300">🧍 Patient Records</h2>
          {patients.map(patient => (
            <div key={patient.id} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition ">
              <h3 className="text-xl font-bold">{patient.name}</h3>
              <p className="text-cyan-200">🧫 Test: {patient.test}</p>
            </div>
          ))}
        </div>
      )}

      <footer className="text-sm text-gray-400 text-center mt-10 border-t border-gray-700 pt-4">
        &copy; 2025 Pathology Lab — Built with React & Tailwind
      </footer>
    </div>
  );
};

export default HomePage;
