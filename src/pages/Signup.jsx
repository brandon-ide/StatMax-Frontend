import React from 'react';
import SignUpForm from '../components/Auth/SignupForm';
import logo from '../assets/logo.png';

const Signup = () => {
  return (
      <div className="signup">
      <SignUpForm />
      <div className="logoAndTagLine">
        <img src={logo} alt="StatMax Logo" className="logo" />
        <h2 id="tagLine">
          Track your stats.<br />Up your game.<br />Be the best.<br />Period.
        </h2>
      </div>
    </div>
  );
};

export default Signup;
