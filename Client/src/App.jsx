import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages/components
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext"; // Use auth context
import Logout from "./pages/Logout"; // Add this import
import AdminDashboard from "./pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Foodlog from "./components/Foodlog";
import Progress from "./components/Progress";
import Reports from "./components/Reports";
import Exercise from "./components/Exercise";
import Profile from "./pages/Profile";
const App = () => {
  const { user } = useAuth(); // Access user and token

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp/:email" element={<VerifyOtp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/food-log" element={<Foodlog></Foodlog>}></Route>
        <Route path="/Progress" element={<Progress />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/Exercise" element={<Exercise />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
