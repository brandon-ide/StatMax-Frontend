import { useState, useContext, useEffect, ChangeEvent, FormEvent } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface DrillSessionFormProps {
  existingSession?: {
    _id: string;
    title: string;
    mode: string;
    stats: {
      shotsMade: number;
      shotsAttempted: number;
      shootingPercentage: number;
    };
  };
  presetMode?: string;
  onSuccess?: () => void;
}

const DrillSessionForm: React.FC<DrillSessionFormProps> = ({ existingSession, presetMode, onSuccess }) => {
const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext must be used within an AuthProvider");
const { user } = authContext;


  const [title, setTitle] = useState(existingSession?.title || '');
  const [mode] = useState(existingSession?.mode || presetMode || '');
  const [shotsMade, setShotsMade] = useState<string>(existingSession?.stats?.shotsMade?.toString() || '');
  const [shotsAttempted, setShotsAttempted] = useState<string>(existingSession?.stats?.shotsAttempted?.toString() || '');
  const [shootingPercentage, setShootingPercentage] = useState<number>(existingSession?.stats?.shootingPercentage || 0);

  useEffect(() => {
    const made = Number(shotsMade);
    const attempted = Number(shotsAttempted);
    setShootingPercentage(attempted > 0 ? Number(((made / attempted) * 100).toFixed(1)) : 0);
  }, [shotsMade, shotsAttempted]);

  const handleNumInput = (setter: (val: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setter(val.slice(0, 3));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

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
          stats: {
            shotsMade: Number(shotsMade) || 0,
            shotsAttempted: Number(shotsAttempted) || 0,
            shootingPercentage,
          },
        }),
      });
      if (!res.ok) throw new Error('Failed to save session');
      onSuccess?.();
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
        {existingSession ? 'Update Session' : 'Create Session'}
      </button>
    </form>
  );
};

export default DrillSessionForm;
