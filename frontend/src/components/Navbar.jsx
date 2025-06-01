import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-800 text-white px-6 py-4 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">🧪 Lab Dashboard</h1>
        <div className="space-x-6">
          <Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link>
          <Link to="/add-patient" className="hover:text-yellow-300">Add Patient</Link>
          <Link to="/patients" className="hover:text-yellow-300">View Patients</Link>
          <Link to="/add-test" className="hover:text-yellow-300">Add Test</Link>
          <Link to="/logout" className="hover:text-yellow-300">Logout</Link>
        </div>
      </div>
    </nav>
  );
}
