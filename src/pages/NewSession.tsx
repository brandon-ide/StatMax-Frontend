import { useLocation, useNavigate, Location } from 'react-router-dom';
import { useState } from 'react';
import SessionForm from '../components/Sessions/SessionForm';
import logowhite from '../assets/logowhite.png';

interface LocationState {
  mode?: string;
}

const NewSession: React.FC = () => {
  const { state } = useLocation() as Location & { state: LocationState };
  const navigate = useNavigate();
  const presetMode = state?.mode || '';
  const [success, setSuccess] = useState<boolean>(false);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="newSessionPage">
      <div className="newSessionHeader">
        <img src={logowhite} alt="StatMax Logo White" className="dashboardLogoWhite" />
        <h1 id="newSessionTop">New Session</h1>
        <button 
          className="goBackButton" 
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>

      {success && (
        <p style={{ color: "lightgreen", fontWeight: "bold" }}>
          Session saved successfully!
        </p>
      )}

      <SessionForm presetMode={presetMode} onSuccess={handleSuccess} />
    </div>
  );
};

export default NewSession;
