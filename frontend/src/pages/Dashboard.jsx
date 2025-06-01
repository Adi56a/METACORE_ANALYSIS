import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaVial,
  FaChartBar,
  FaFileMedical,
  FaNotesMedical,
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-14">
        <h1 className="text-4xl font-semibold text-gray-800 flex items-center gap-3 select-none">
          <span className="text-4xl">🧪</span> Pathology Lab Dashboard
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("isAuthenticated");
            navigate("/");
          }}
          className="bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-white px-6 py-2 rounded-md font-medium shadow-sm transition"
          aria-label="Logout"
        >
          Logout
        </button>
      </header>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
        <StatCard
          title="Total Patients"
          value="1,320"
          icon={<FaUserPlus className="text-4xl text-blue-600" />}
          bgColor="bg-white"
        />
        <StatCard
          title="Total Tests"
          value="842"
          icon={<FaVial className="text-4xl text-purple-600" />}
          bgColor="bg-white"
        />
        <StatCard
          title="Reports Generated"
          value="758"
          icon={<FaFileMedical className="text-4xl text-green-600" />}
          bgColor="bg-white"
        />
        <StatCard
          title="Today's Tests"
          value="34"
          icon={<FaNotesMedical className="text-4xl text-yellow-500" />}
          bgColor="bg-white"
        />
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <ActionCard
          title="Add New Patient"
          description="Register a new patient into the system"
          icon={<FaUserPlus className="text-5xl text-blue-600" />}
          onClick={() => navigate("/add-patient")}
          borderColor="border-blue-500"
          hoverColor="hover:bg-blue-50"
        />
        <ActionCard
          title="View Patients"
          description="Browse and search all registered patients"
          icon={<FaUserPlus className="text-5xl text-blue-700" />}
          onClick={() => navigate("/patients")}
          borderColor="border-blue-700"
          hoverColor="hover:bg-blue-100"
        />
        <ActionCard
          title="Add New Test"
          description="Add a test type to your lab database"
          icon={<FaVial className="text-5xl text-purple-600" />}
          onClick={() => navigate("/add-test")}
          borderColor="border-purple-500"
          hoverColor="hover:bg-purple-50"
        />
        <ActionCard
          title="Generate Report"
          description="Upload results and generate printable PDF"
          icon={<FaFileMedical className="text-5xl text-green-600" />}
          onClick={() => navigate("/generate-report")}
          borderColor="border-green-500"
          hoverColor="hover:bg-green-50"
        />
        <ActionCard
          title="View Analytics"
          description="Visual charts on revenue, patients, tests"
          icon={<FaChartBar className="text-5xl text-pink-600" />}
          onClick={() => navigate("/analytics")}
          borderColor="border-pink-500"
          hoverColor="hover:bg-pink-50"
        />
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon, bgColor }) => (
  <div
    className={`flex items-center gap-5 p-6 rounded-lg shadow-md border border-gray-200 ${bgColor} transition-transform transform hover:scale-105 duration-200 ease-in-out`}
  >
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <p className="text-gray-600 font-semibold tracking-wide">{title}</p>
      <h3 className="text-2xl font-extrabold text-gray-900">{value}</h3>
    </div>
  </div>
);

const ActionCard = ({
  title,
  description,
  icon,
  onClick,
  borderColor = "border-blue-500",
  hoverColor = "hover:bg-blue-50",
}) => (
  <div
    onClick={onClick}
    className={`cursor-pointer flex gap-6 items-center p-6 rounded-lg shadow-lg border-l-6 ${borderColor} bg-white transition-transform transform hover:scale-105 ${hoverColor} hover:shadow-2xl active:scale-95 duration-200 ease-in-out`}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
  >
    <div>{icon}</div>
    <div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
  </div>
);
