import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const SessionForm = ({ existingSession, presetMode, onSuccess }) => {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState(existingSession?.title || '');
  const [mode] = useState(existingSession?.mode || presetMode || '');

  const [points, setPoints] = useState(existingSession?.stats?.points ?? '');
  const [rebounds, setRebounds] = useState(existingSession?.stats?.rebounds ?? '');
  const [assists, setAssists] = useState(existingSession?.stats?.assists ?? '');
  const [steals, setSteals] = useState(existingSession?.stats?.steals ?? '');
  const [blocks, setBlocks] = useState(existingSession?.stats?.blocks ?? '');
  const [turnovers, setTurnovers] = useState(existingSession?.stats?.turnovers ?? '');
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
            points: Number(points) || 0,
            rebounds: Number(rebounds) || 0,
            assists: Number(assists) || 0,
            steals: Number(steals) || 0,
            blocks: Number(blocks) || 0,
            turnovers: Number(turnovers) || 0,
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
      <input id="sessionInput" type="text" placeholder="Session Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <input id="sessionInput" type="text" value={mode} readOnly style={{ backgroundColor: "#555", color: "#fff" }} />

      <input id="sessionInput" type="text" placeholder="Points" value={points} onChange={handleNumberInput(setPoints)} inputMode="numeric" pattern="\d*" />

      <input id="sessionInput" type="text" placeholder="Rebounds" value={rebounds} onChange={handleNumberInput(setRebounds)} inputMode="numeric" pattern="\d*" />

      <input id="sessionInput" type="text" placeholder="Assists" value={assists} onChange={handleNumberInput(setAssists)} inputMode="numeric" pattern="\d*" />

      <input id="sessionInput" type="text" placeholder="Steals" value={steals} onChange={handleNumberInput(setSteals)} inputMode="numeric" pattern="\d*" />

      <input id="sessionInput" type="text" placeholder="Blocks" value={blocks} onChange={handleNumberInput(setBlocks)} inputMode="numeric" pattern="\d*" />

      <input id="sessionInput" type="text" placeholder="Turnovers" value={turnovers} onChange={handleNumberInput(setTurnovers)} inputMode="numeric" pattern="\d*" />

      <input id="sessionInput" type="text" placeholder="Shots Made" value={shotsMade} onChange={handleNumberInput(setShotsMade)} inputMode="numeric" pattern="\d*" />

      <input id="sessionInput" type="text" placeholder="Shots Attempted" value={shotsAttempted} onChange={handleNumberInput(setShotsAttempted)} inputMode="numeric" pattern="\d*" />

      <input id="sessionInput" type="text" value={`${shootingPercentage}%`} readOnly style={{ backgroundColor: "#333", color: "lightgreen", fontWeight: "bold" }} /><br />

      <button id="createSessionButton" type="submit">{existingSession ? "Update Session" : "Create Session"}</button>
    </form>
  );
};

export default SessionForm;
