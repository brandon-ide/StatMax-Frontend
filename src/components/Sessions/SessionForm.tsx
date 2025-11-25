import { useState, useContext, useEffect, ChangeEvent, FormEvent } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface SessionStats {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  shotsMade: number;
  shotsAttempted: number;
  shootingPercentage: number;
}

interface Session {
  _id?: string;
  title: string;
  mode: string;
  stats: SessionStats;
}

interface SessionFormProps {
  existingSession?: Session;
  presetMode?: string;
  onSuccess?: () => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ existingSession, presetMode, onSuccess }) => {
const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext must be used within an AuthProvider");
const { user } = authContext;


  const [title, setTitle] = useState<string>(existingSession?.title || '');
  const [mode] = useState<string>(existingSession?.mode || presetMode || '');

  const [points, setPoints] = useState<string>(existingSession?.stats?.points?.toString() || '');
  const [rebounds, setRebounds] = useState<string>(existingSession?.stats?.rebounds?.toString() || '');
  const [assists, setAssists] = useState<string>(existingSession?.stats?.assists?.toString() || '');
  const [steals, setSteals] = useState<string>(existingSession?.stats?.steals?.toString() || '');
  const [blocks, setBlocks] = useState<string>(existingSession?.stats?.blocks?.toString() || '');
  const [turnovers, setTurnovers] = useState<string>(existingSession?.stats?.turnovers?.toString() || '');
  const [shotsMade, setShotsMade] = useState<string>(existingSession?.stats?.shotsMade?.toString() || '');
  const [shotsAttempted, setShotsAttempted] = useState<string>(existingSession?.stats?.shotsAttempted?.toString() || '');
  const [shootingPercentage, setShootingPercentage] = useState<number>(existingSession?.stats?.shootingPercentage || 0);

  // Auto-calculate shooting percentage
  useEffect(() => {
    const made = Number(shotsMade);
    const attempted = Number(shotsAttempted);
    if (attempted > 0) {
      setShootingPercentage(Number(((made / attempted) * 100).toFixed(1)));
    } else {
      setShootingPercentage(0);
    }
  }, [shotsMade, shotsAttempted]);

  const handleNumberInput = (setter: (val: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setter(val.slice(0, 3));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.token) return;

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

      if (!res.ok) throw new Error('Failed to save session');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sessionForm">
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
        style={{ backgroundColor: '#555', color: '#fff' }}
      />
      <input
        id="sessionInput"
        type="text"
        placeholder="Points"
        value={points}
        onChange={handleNumberInput(setPoints)}
        inputMode="numeric"
        pattern="\d*"
      />
      <input
        id="sessionInput"
        type="text"
        placeholder="Rebounds"
        value={rebounds}
        onChange={handleNumberInput(setRebounds)}
        inputMode="numeric"
        pattern="\d*"
      />
      <input
        id="sessionInput"
        type="text"
        placeholder="Assists"
        value={assists}
        onChange={handleNumberInput(setAssists)}
        inputMode="numeric"
        pattern="\d*"
      />
      <input
        id="sessionInput"
        type="text"
        placeholder="Steals"
        value={steals}
        onChange={handleNumberInput(setSteals)}
        inputMode="numeric"
        pattern="\d*"
      />
      <input
        id="sessionInput"
        type="text"
        placeholder="Blocks"
        value={blocks}
        onChange={handleNumberInput(setBlocks)}
        inputMode="numeric"
        pattern="\d*"
      />
      <input
        id="sessionInput"
        type="text"
        placeholder="Turnovers"
        value={turnovers}
        onChange={handleNumberInput(setTurnovers)}
        inputMode="numeric"
        pattern="\d*"
      />
      <input
        id="sessionInput"
        type="text"
        placeholder="Shots Made"
        value={shotsMade}
        onChange={handleNumberInput(setShotsMade)}
        inputMode="numeric"
        pattern="\d*"
      />
      <input
        id="sessionInput"
        type="text"
        placeholder="Shots Attempted"
        value={shotsAttempted}
        onChange={handleNumberInput(setShotsAttempted)}
        inputMode="numeric"
        pattern="\d*"
      />
      <input
        id="sessionInput"
        type="text"
        value={`${shootingPercentage}%`}
        readOnly
        style={{ backgroundColor: '#333', color: 'lightgreen', fontWeight: 'bold' }}
      />
      <br />
      <button id="createSessionButton" type="submit">
        {existingSession ? 'Update Session' : 'Create Session'}
      </button>
    </form>
  );
};

export default SessionForm;
