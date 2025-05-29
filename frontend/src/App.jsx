import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import AddPatient from './pages/AddPatients';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/add-patient" element={ <ProtectedRoute> <AddPatient /> </ProtectedRoute> }
/>
      </Routes>
    </Router>
  );
}

export default App;
