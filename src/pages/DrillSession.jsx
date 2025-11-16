import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DrillSessionForm from '../components/Sessions/DrillSessionForm';

const DrillSession = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const presetMode = state?.mode || '';
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate('/');
    }, 2000);
  };
  
  return (
    <div className="drillSessionPage">
      <button 
        className="goBackButton" 
        onClick={() => navigate(-1)}
        style={{
          position: "fixed",
          top: "15px",
          right: "15px",
          padding: "8px 14px",
          cursor: "pointer"
        }}
      >
        Go Back
      </button>
      <h1>Shooting Drill Session</h1>
      {success && (
        <p style={{ color: "lightgreen", fontWeight: "bold" }}>
          Session saved successfully!
        </p>
      )}
      <DrillSessionForm presetMode={presetMode} onSuccess={handleSuccess} />
    </div>
  );
};

export default DrillSession;
