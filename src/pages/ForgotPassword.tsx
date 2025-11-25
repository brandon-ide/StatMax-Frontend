import React from 'react';
import ForgotPassword from '../components/Auth/ForgotPasswordForm';
import logo from '../assets/logo.png';

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="forgotPassword">
      <ForgotPassword />
      <div className="logoAndTagLine">
        <img src={logo} alt="StatMax Logo" className="logo" />
        <h2 id="tagLine">
          Track your stats.<br />Up your game.<br />Be the best.<br />Period.
        </h2>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
