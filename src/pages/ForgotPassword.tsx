import React from 'react';
import ForgotPassword from '../components/Auth/ForgotPasswordForm';
import LandingPage from './LandingPage';

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="forgotPassword">
      <LandingPage />
      <ForgotPassword />
    </div>
  );
};

export default ForgotPasswordPage;
