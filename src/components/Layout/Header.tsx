import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../../context/AuthContext';

const Header: React.FC = () => {
const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext must be used within an AuthProvider");
const { user, logout } = authContext;

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
