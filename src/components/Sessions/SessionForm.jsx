import { useState } from 'react';
import { createSession } from '../../api/api';

const SessionForm = ({ token, existingSession = null, onSuccess }) => {
  const [form, setForm] = useState(
    existingSession || {
      title: '',
      mode: '',
      stats: {
        points: 0,
        assists: 0,
        rebounds: 0,
        steals: 0,
        blocks: 0,
        turnovers: 0,
        shotsMade: 0,
        shotsAttempted: 0,
      },
    }
  );
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (Object.keys(form.stats).includes(name)) {
      setForm({
        ...form,
        stats: { ...form.stats, [name]: Number(value) },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createSession(form, token);
      setMessage('Session saved successfully!');
      if (onSuccess) onSuccess(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error saving session.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="session-form">
      <input
        type="text"
        name="title"
        placeholder="Session Title"
        value={form.title}
        onChange={handleChange}
      />
      <select name="mode" value={form.mode} onChange={handleChange}>
        <option value="">Select Mode</option>
        <option value="practice">Practice</option>
        <option value="game">Game</option>
        <option value="training">Training</option>
      </select>

      <h4>Stats</h4>
      {Object.keys(form.stats).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input
            type="number"
            name={key}
            value={form.stats[key]}
            onChange={handleChange}
          />
        </div>
      ))}

      <button type="submit">Save Session</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SessionForm;
