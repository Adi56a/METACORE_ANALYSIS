import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import AddPatient from './pages/AddPatients';
import ViewPatients from './pages/ShowPatients';
import AddLabTest from './pages/AddNewTest';
import MainLayout from './layouts/MainLayouts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/add-patient"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AddPatient />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ViewPatients />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-test"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AddLabTest />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
