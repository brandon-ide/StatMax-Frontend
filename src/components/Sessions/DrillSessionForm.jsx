import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const DrillSessionForm = ({ existingSession, presetMode, onSuccess }) => {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState(existingSession?.title || "");
  const [mode] = useState(existingSession?.mode || presetMode || "");

  const [shotsMade, setShotsMade] = useState(existingSession?.stats?.shotsMade ?? "");
  const [shotsAttempted, setShotsAttempted] = useState(existingSession?.stats?.shotsAttempted ?? "");
  const [shootingPercentage, setShootingPercentage] = useState(existingSession?.stats?.shootingPercentage ?? 0);

  useEffect(() => {
    if (shotsAttempted > 0) {
      setShootingPercentage(((shotsMade / shotsAttempted) * 100).toFixed(1));
    } else {
      setShootingPercentage(0);
    }
  }, [shotsMade, shotsAttempted]);

  const handleNumInput = (setter) => (e) => {
    const val = e.target.value.replace(/\D/g, "")
    setter(val.slice(0, 3));
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
            shootingPercentage: Number(shootingPercentage)
          }
        }),
      });

      if (!res.ok) throw new Error("Failed to save session");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="sessionForm" onSubmit={handleSubmit}>

      <input
        id="sessionInput"
        type="text"
        placeholder="Session Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        id="sessionInput"
        type="text"
        value={mode}
        readOnly
        className="readOnlyInput"
      />

      <input
        id="sessionInput"
        type="text"
        placeholder="Shots Made"
        value={shotsMade}
        onChange={handleNumInput(setShotsMade)}
        inputMode="numeric"
        pattern="\d*"
      />

      <input
        id="sessionInput"
        type="text"
        placeholder="Shots Attempted"
        value={shotsAttempted}
        onChange={handleNumInput(setShotsAttempted)}
        inputMode="numeric"
        pattern="\d*"
      />

      <input
        id="sessionInput"
        type="text"
        value={`${shootingPercentage}%`}
        readOnly
        className="shootingPercentField"
      /><br />

      <button id="createSessionButton" type="submit">
        {existingSession ? "Update Session" : "Create Session"}
      </button>
    </form>
  );
};

export default DrillSessionForm;
