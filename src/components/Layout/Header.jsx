import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <h1>StatMax</h1>
      {user && (
        <nav>
          <Link to="/">Dashboard</Link> |{' '}
          <Link to="/new-session">New Session</Link> |{' '}
          <Link to="/stats">Stats</Link> |{' '}
          <button onClick={handleLogout}>Logout</button>
        </nav>
      )}
    </header>
  );
};

export default Header;
