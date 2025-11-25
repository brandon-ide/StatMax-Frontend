import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrillSessionForm from '../components/Sessions/DrillSessionForm';
import logowhite from '../assets/logowhite.png';

const DrillSession: React.FC = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState<boolean>(false);
  const presetMode: string = "Shooting Drill";

  const handleSuccess = (): void => {
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
        <h1 id="newSessionTop">Shooting Drill</h1>
        <button className="goBackButton" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>

      <DrillSessionForm presetMode={presetMode} onSuccess={handleSuccess} />

      {success && <p className="successMsg">Drill Session Saved!</p>}
    </div>
  );
};

export default DrillSession;
