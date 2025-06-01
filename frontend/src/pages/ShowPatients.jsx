import React, { useEffect, useState } from "react";

export default function ViewPatients() {
  const [patients, setPatients] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchName) params.append("name", searchName);
      if (searchMobile) params.append("mobile", searchMobile);

      const res = await fetch(`http://localhost:5000/api/view-patients?${params}`);
      const data = await res.json();

      if (data.success) {
        setPatients(data.patients);
      } else {
        setPatients([]);
      }
    } catch (err) {
      console.error("Error fetching patients:", err);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center tracking-wide">
          Patient Records
        </h1>

        <section className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 max-w-3xl mx-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search by Mobile"
              value={searchMobile}
              onChange={(e) => setSearchMobile(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.73 19.73 0 01-8.63-3.1 19.38 19.38 0 01-6-6 19.73 19.73 0 01-3.1-8.63A2 2 0 014.11 2h3a2 2 0 012 1.72c.13 1.21.48 2.39 1.03 3.5a2 2 0 01-.45 2.11L9.7 10.3a16 16 0 006 6l1.01-1.01a2 2 0 012.11-.45c1.11.55 2.29.9 3.5 1.03a2 2 0 011.72 2z" />
            </svg>
          </div>

          <button
            onClick={fetchPatients}
            className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Search
          </button>
        </section>

        {loading ? (
          <p className="text-center text-blue-600 font-medium text-lg animate-pulse">
            Loading patients...
          </p>
        ) : patients.length === 0 ? (
          <p className="text-center text-gray-500 italic text-lg">
            No patients found.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
            <table className="min-w-full bg-white text-gray-800">
              <thead className="bg-blue-100 text-blue-800 font-semibold select-none">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-center">Age</th>
                  <th className="py-3 px-6 text-center">Gender</th>
                  <th className="py-3 px-6 text-center">Mobile</th>
                  <th className="py-3 px-6 text-center">Visit Date</th>
                  <th className="py-3 px-6 text-center">Referred By</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p, idx) => (
                  <tr
                    key={p.id}
                    className={`border-t ${
                      idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                    } hover:bg-blue-100 transition-colors cursor-default`}
                  >
                    <td className="py-3 px-6">{p.name}</td>
                    <td className="py-3 px-6 text-center">{p.age}</td>
                    <td className="py-3 px-6 text-center">{p.gender}</td>
                    <td className="py-3 px-6 text-center">{p.mobile}</td>
                    <td className="py-3 px-6 text-center">{p.visitDate}</td>
                    <td className="py-3 px-6 text-center">{p.referredBy}</td>
                    <td className="py-3 px-6">{p.email || "-"}</td>
                    <td className="py-3 px-6">{p.notes || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
