import React from 'react';
import SignUpForm from '../components/Auth/SignupForm';
import LandingPage from './LandingPage';

const Signup: React.FC = () => {
  return (
    <div className="signup">
      <LandingPage />
      <SignUpForm />
    </div>
  );
};

export default Signup;
