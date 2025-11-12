import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import logo from '../assets/logo.png';

const Login = () => {
  return (
    <div className="login">
      <LoginForm />
      <div className="logoAndTagLine">
        <img src={logo} alt="StatMax Logo" className="logo" />
        <h2 id="tagLine">
          Track your stats.<br />Up your game.<br />Be the best.<br />Period.
        </h2>
      </div>
    </div>
  );
};

export default Login;
