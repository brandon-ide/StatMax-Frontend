import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SessionForm = ({ existingSession }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState(existingSession?.title || '');
  const [mode, setMode] = useState(existingSession?.mode || '');
  const [points, setPoints] = useState(existingSession?.stats.points || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = existingSession ? 'PUT' : 'POST';
    const url = existingSession
      ? `http://localhost:5050/api/sessions/${existingSession._id}`
      : 'http://localhost:5050/api/sessions';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          title,
          mode,
          stats: { points },
        }),
      });

      if (!res.ok) throw new Error('Failed to save session');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Mode"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Points"
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
        min={0}
      />
      <button type="submit">{existingSession ? 'Update' : 'Create'} Session</button>
    </form>
  );
};

export default SessionForm;
