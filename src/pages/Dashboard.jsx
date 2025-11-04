import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <p>Token: {user.token}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
