import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaVial, FaChartBar, FaFileMedical, FaNotesMedical } from 'react-icons/fa';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">🧪 Pathology Lab Dashboard</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
          onClick={() => {
            localStorage.removeItem('isAuthenticated');
            navigate('/');
          }}
        >
          Logout
        </button>
      </header>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Patients" value="1320" icon={<FaUserPlus className="text-3xl text-blue-500" />} />
        <StatCard title="Total Tests" value="842" icon={<FaVial className="text-3xl text-purple-500" />} />
        <StatCard title="Reports Generated" value="758" icon={<FaFileMedical className="text-3xl text-green-500" />} />
        <StatCard title="Today's Tests" value="34" icon={<FaNotesMedical className="text-3xl text-yellow-500" />} />
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActionCard
          title="Add New Patient"
          description="Register a new patient into the system"
          icon={<FaUserPlus className="text-4xl text-blue-500" />}
          onClick={() => navigate('/add-patient')}
        />
        <ActionCard
          title="Add New Test"
          description="Add a test type to your lab database"
          icon={<FaVial className="text-4xl text-purple-500" />}
          onClick={() => navigate('/add-test')}
        />
        <ActionCard
          title="Generate Report"
          description="Upload results and generate printable PDF"
          icon={<FaFileMedical className="text-4xl text-green-500" />}
          onClick={() => navigate('/generate-report')}
        />
        <ActionCard
          title="View Analytics"
          description="Visual charts on revenue, patients, tests"
          icon={<FaChartBar className="text-4xl text-pink-500" />}
          onClick={() => navigate('/analytics')}
        />
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
    <div className="flex items-center space-x-4">
      <div>{icon}</div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <h2 className="text-xl font-semibold">{value}</h2>
      </div>
    </div>
  </div>
);

const ActionCard = ({ title, description, icon, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border-l-4 border-blue-500"
  >
    <div className="flex items-center space-x-4">
      {icon}
      <div>
        <h3 className="text-lg font-bold text-blue-700">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  </div>
);
