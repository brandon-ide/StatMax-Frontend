import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const SessionItem = ({ session, onDelete }) => {
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5050/api/sessions/${session._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (onDelete) onDelete(session._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li>
      <h3>{session.title}</h3>
      <p>Mode: {session.mode}</p>
      <p>Points: {session.stats.points}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default SessionItem;
