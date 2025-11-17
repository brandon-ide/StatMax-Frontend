import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NewSession from './pages/NewSession';
import DrillSession from './pages/DrillSession';
import Stats from './pages/Stats';
import ProtectedRoute from './components/ProtectedRoute';
import UpdateSession from './pages/UpdateSession';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-session"
          element={
            <ProtectedRoute>
              <NewSession />
            </ProtectedRoute>
          }
        />
        <Route
          path="/drill-session"
          element={
            <ProtectedRoute>
              <DrillSession />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <Stats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-session"
          element={
            <ProtectedRoute>
              <UpdateSession />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

