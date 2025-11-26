import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import LandingPage from './LandingPage';

const Login: React.FC = () => {
  return (
    <div className="login">
      <LandingPage />
      <LoginForm />
    </div>
  );
};

export default Login;
