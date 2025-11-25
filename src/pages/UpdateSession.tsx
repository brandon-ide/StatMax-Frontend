import { useLocation, useNavigate } from 'react-router-dom';
import SessionForm from '../components/Sessions/SessionForm';
import { useState } from 'react';
import logowhite from '../assets/logowhite.png';

interface Session {
  _id: string;
  title: string;
  mode: string;
  date: string;
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

interface LocationState {
  session?: Session;
}

const UpdateSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const existingSession = state?.session;

  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="newSessionPage">
      <div className="newSessionHeader">
        <img src={logowhite} alt="StatMax Logo White" className="dashboardLogoWhite" />
        <h1 id="newSessionTop">Update Session</h1>
        <button className="goBackButton" onClick={() => navigate(-1)}>Go Back</button>
      </div>

      <SessionForm existingSession={existingSession} onSuccess={handleSuccess} />

      {success && <p className="successMsg">Session Updated!</p>}
    </div>
  );
};

export default UpdateSession;
