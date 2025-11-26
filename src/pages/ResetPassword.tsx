import React from 'react';
import ResetPasswordForm from '../components/Auth/ResetPasswordForm';
import LandingPage from './LandingPage';

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="resetPassword">
      <LandingPage />
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
