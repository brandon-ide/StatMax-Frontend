import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Stats = () => {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
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

  const totalShotsMade = sessions.reduce((sum, s) => sum + (s.stats.shotsMade || 0), 0);
  const totalShotsAttempted = sessions.reduce((sum, s) => sum + (s.stats.shotsAttempted || 0), 0);
  const shootingPercentage = totalShotsAttempted
    ? ((totalShotsMade / totalShotsAttempted) * 100).toFixed(2)
    : 0;

  return (
    <div>
      <h1>Stats</h1>
      <p>Total Shots Made: {totalShotsMade}</p>
      <p>Total Shots Attempted: {totalShotsAttempted}</p>
      <p>Shooting Percentage: {shootingPercentage}%</p>
    </div>
  );
};

export default Stats;
