import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SessionList from '../components/Sessions/SessionList';
import logowhite from '../assets/logowhite.png';

interface Session {
  _id: string;
  title: string;
  mode: string;
  date: string; // required
  stats: {
    points: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
    shotsMade: number;
    shotsAttempted: number;
    shootingPercentage: number;
  };
}

const Stats = () => {
const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext must be used within an AuthProvider");
const { user } = authContext;
const [sessions, setSessions] = useState<Session[]>([]);
const navigate = useNavigate();

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

  // Calculations
  const totalShotsMade = sessions.reduce((sum, s) => sum + (s.stats.shotsMade || 0), 0);
  const totalShotsAttempted = sessions.reduce((sum, s) => sum + (s.stats.shotsAttempted || 0), 0);
  const shootingPercentage = totalShotsAttempted
    ? ((totalShotsMade / totalShotsAttempted) * 100).toFixed(2)
    : '0';

  const totalAssists = sessions.reduce((sum, s) => sum + (s.stats.assists || 0), 0);
  const totalRebounds = sessions.reduce((sum, s) => sum + (s.stats.rebounds || 0), 0);
  const totalBlocks = sessions.reduce((sum, s) => sum + (s.stats.blocks || 0), 0);
  const totalSteals = sessions.reduce((sum, s) => sum + (s.stats.steals || 0), 0);
  const totalTurnovers = sessions.reduce((sum, s) => sum + (s.stats.turnovers || 0), 0);
  const totalPoints = sessions.reduce((sum, s) => sum + (s.stats.points || 0), 0);

  return (
    <div className="statsPage">
      <div className="newSessionHeader">
        <img src={logowhite} alt="StatMax Logo White" className="dashboardLogoWhite" />
        <h1 id="newSessionTop">{user?.username}'s Past Sessions & All-Time Stats</h1>
        <button className="goBackButton" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>

      <div className="allTimeStatsContainer">
        <div className="allTimeStats1">
          <p><strong>All-Time Points:</strong> {totalPoints}</p>
          <p><strong>All-Time Assists:</strong> {totalAssists}</p>
          <p><strong>All-Time Rebounds:</strong> {totalRebounds}</p>
          <p><strong>All-Time Blocks:</strong> {totalBlocks}</p>
        </div>
        <div className="allTimeStats2">
          <p><strong>All-Time Steals:</strong> {totalSteals}</p>
          <p><strong>All-Time Turnovers:</strong> {totalTurnovers}</p>
          <p><strong>All-Time Shots Made:</strong> {totalShotsMade}</p>
          <p><strong>All-Time Shots Attempted:</strong> {totalShotsAttempted}</p><br />
        </div>
      </div>

      <div className="shootingPercentStat">
        <p><strong>All-Time Shooting Percentage:</strong> {shootingPercentage}%</p><br />
      </div>

      <div className="sessionListContainer">
        <SessionList sessions={sessions} setSessions={setSessions} />
      </div>
    </div>
  );
};

export default Stats;
