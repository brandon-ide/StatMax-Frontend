import { useEffect, useState, useContext } from 'react';
import { getSessions } from '../api/api';
import { AuthProvider } from '../contexts/AuthContext';
import SessionList from '../components/Sessions/SessionList';

const Dashboard = () => {
  const { token } = useContext(AuthProvider);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await getSessions(token);
        setSessions(res.data);
      } catch (err) {
        console.error('Error fetching sessions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [token]);

  return (
    <div className="page-container">
      <h2>Dashboard</h2>
      {loading ? (
        <p>Loading sessions...</p>
      ) : sessions.length > 0 ? (
        <SessionList sessions={sessions} />
      ) : (
        <p>No sessions yet. Record one to get started!</p>
      )}
    </div>
  );
};

export default Dashboard;
