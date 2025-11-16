import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const SessionItem = ({ session, setSessions }) => {
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5050/api/sessions/${session._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setSessions(prev => prev.filter(s => s._id !== session._id));

    } catch (err) {
      console.error(err);
    }
  };

  const formattedDate = new Date(session.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="sessionItem">
    <li>
      <h3>{session.title}</h3><p className="date">{formattedDate}</p><br />
      <p>Mode: {session.mode}</p>
      <p>Points: {session.stats.points}</p>
      <p>Assists: {session.stats.assists}</p>
      <p>Rebounds: {session.stats.rebounds}</p>
      <p>Steals: {session.stats.steals}</p>
      <p>Blocks: {session.stats.blocks}</p>
      <p>Turnovers: {session.stats.turnovers}</p>
      <p>Shots Made: {session.stats.shotsMade}</p>
      <p>Shots Attempted: {session.stats.shotsAttempted}</p>
      <p>Shooting %: {session.stats.shootingPercentage}</p><br />
      <button id="deleteSessionItem" onClick={handleDelete}>Delete</button>
    </li>
    </div>
  );
};

export default SessionItem;
