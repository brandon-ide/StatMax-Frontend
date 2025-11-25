import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import logowhite from '../assets/logowhite.png';

interface SessionStats {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  shotsMade: number;
  shotsAttempted: number;
  shootingPercentage: number;
}

interface Session {
  _id: string;
  title: string;
  mode: string;
  date: string;
  stats: SessionStats;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const navigate = useNavigate();

  const handleClick = (mode: string) => {
    if (mode === 'Shooting Drill') {
      navigate('/drill-session');
    } else if (mode === 'View Past Sessions') {
      navigate('/stats');
    } else if (mode === 'View Rankings') {
      navigate('/rankings');
    } else {
      navigate('/new-session', { state: { mode } });
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
        const data: Session[] = await res.json();
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
            <XAxis dataKey="title" stroke="#fff" fontSize={10} />
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

      <h2 id="navButtonsHeader">Start A New Session</h2>

      <div className="navButtons">
        {['Official Game', 'Pickup Game', 'Practice Session', 'Shooting Drill', 'View Past Sessions', 'View Rankings'].map((mode) => (
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
