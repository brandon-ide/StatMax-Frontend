import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const DrillSessionForm = ({ existingSession, presetMode, onSuccess }) => {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState(existingSession?.title || '');
  const [mode] = useState(existingSession?.mode || presetMode || '');

  const [shotsMade, setShotsMade] = useState(existingSession?.stats?.shotsMade ?? '');
  const [shotsAttempted, setShotsAttempted] = useState(existingSession?.stats?.shotsAttempted ?? '');
  const [shootingPercentage, setShootingPercentage] = useState(existingSession?.stats?.shootingPercentage ?? 0);

  // Auto-calculate shooting percentage
  useEffect(() => {
    if (shotsAttempted > 0) {
      setShootingPercentage(((shotsMade / shotsAttempted) * 100).toFixed(1));
    } else {
      setShootingPercentage(0);
    }
  }, [shotsMade, shotsAttempted]);

  const handleNumberInput = (setter) => (e) => {
    const val = e.target.value.replace(/\D/g, ''); // only digits
    setter(val.slice(0, 3)); // max 3 digits
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = existingSession ? "PUT" : "POST";
    const url = existingSession
      ? `http://localhost:5050/api/sessions/${existingSession._id}`
      : "http://localhost:5050/api/sessions";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          title,
          mode,
          stats: {
            shotsMade: Number(shotsMade) || 0,
            shotsAttempted: Number(shotsAttempted) || 0,
            shootingPercentage: Number(shootingPercentage),
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to save session");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sessionForm">
      <input type="text" placeholder="Session Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <input type="text" value={mode} readOnly style={{ backgroundColor: "#555", color: "#fff" }} />

      <input type="text" placeholder="Shots Made" value={shotsMade} onChange={handleNumberInput(setShotsMade)} inputMode="numeric" pattern="\d*" />

      <input type="text" placeholder="Shots Attempted" value={shotsAttempted} onChange={handleNumberInput(setShotsAttempted)} inputMode="numeric" pattern="\d*" />

      <input type="text" value={`${shootingPercentage}%`} readOnly style={{ backgroundColor: "#333", color: "lightgreen", fontWeight: "bold" }} />

      <button type="submit">{existingSession ? "Update Session" : "Create Session"}</button>
    </form>
  );
};

export default DrillSessionForm;
