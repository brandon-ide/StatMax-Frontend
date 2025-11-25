import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import NewSession from "./pages/NewSession";
import DrillSession from "./pages/DrillSession";
import Stats from "./pages/Stats";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateSession from "./pages/UpdateSession";
import Rankings from "./pages/Rankings";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

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

        <Route
          path="/rankings"
          element={
            <ProtectedRoute>
              <Rankings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
