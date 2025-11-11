import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const DrillSession = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [shotsMade, setShotsMade] = useState(0);
  const [shotsAttempted, setShotsAttempted] = useState(0);

  const shootingPercentage = shotsAttempted
    ? ((shotsMade / shotsAttempted) * 100).toFixed(2)
    : 0;

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch(`http://localhost:5050/api/sessions/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        setShotsMade(data.stats.shotsMade || 0);
        setShotsAttempted(data.stats.shotsAttempted || 0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSession();
  }, [id, user]);

  return (
    <div>
      <h1>Drill Session</h1>
      <input
        type="number"
        value={shotsMade}
        onChange={(e) => setShotsMade(Number(e.target.value))}
        min={0}
        placeholder="Shots Made"
      />
      <input
        type="number"
        value={shotsAttempted}
        onChange={(e) => setShotsAttempted(Number(e.target.value))}
        min={0}
        placeholder="Shots Attempted"
      />
      <p>Shooting Percentage: {shootingPercentage}%</p>
    </div>
  );
};

export default DrillSession;
