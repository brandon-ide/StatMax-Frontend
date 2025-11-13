import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import SessionList from '../components/Sessions/SessionList';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import logowhite from '../assets/logowhite.png';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (mode) => {
    if (mode === 'Shooting Drill') {
      navigate('/drill-session');
    } else if (mode === 'View All-Time Stats') {
      navigate('/stats');
    }
    else {
      navigate('/new-session');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;
      try {
        const res = await fetch('http://localhost:5050/api/sessions', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        setSessions(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSessions();
  }, [user]);

  return (
    <div className="dashboard">
      <div className="dashboardHeader">
      <img src={logowhite} alt="StatMax Logo White" className="dashboardLogoWhite" />
      <h1 className="dashTitle">{user?.username}'s Stat Dashboard</h1>
      <button className="logoutButton" onClick={handleLogout}>Logout</button>
      </div>
      <div className="chartContainer">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sessions}>
            <CartesianGrid strokeDasharray="2 2" stroke="#444" />
            <XAxis dataKey="title" stroke="#fff" />
            <YAxis stroke="#fff" domain={[0, 30]} />
            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }}/>
            <Line type="monotone" dataKey="stats.points" stroke="#3cd500" strokeWidth={2} name="Points" />
            <Line type="monotone" dataKey="stats.rebounds" stroke="#FFD700" strokeWidth={2} name="Rebounds" />
            <Line type="monotone" dataKey="stats.assists" stroke="#3399FF" strokeWidth={2} name="Assists" />
            <Line type="monotone" dataKey="stats.blocks" stroke="#ca0000" strokeWidth={2} name="Blocks" />
            <Line type="monotone" dataKey="stats.steals" stroke="#f27d00" strokeWidth={2} name="Steals" />
            <Line type="monotone" dataKey="stats.turnovers" stroke="#FF00FF" strokeWidth={2} name="Turnovers" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <SessionList sessions={sessions} />
      <div className="navButtons">
        <h2>Start A New Session</h2>
        {['Official Game', 'Pickup Game', 'Practice Session', 'Shooting Drill', 'View All-Time Stats'].map((mode) => (
          <button key={mode} onClick={() => handleClick(mode)}>
            {mode}
          </button>
        ))}
      </div>
      <div className="dashboardFooter">
        <p>© {new Date().getFullYear()} StatMax. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Dashboard;
