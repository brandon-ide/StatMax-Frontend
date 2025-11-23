import React from 'react';
import logo from '../assets/logo.png';
import ResetPassword from '../components/Auth/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <div className="resetPassword">
      <ResetPassword />
      <div className="logoAndTagLine">
        <img src={logo} alt="StatMax Logo" className="logo" />
        <h2 id="tagLine">
          Track your stats.<br />Up your game.<br />Be the best.<br />Period.
        </h2>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
