import { useContext } from 'react';
import SessionForm from '../components/Sessions/SessionForm';
import { AuthProvider } from '../contexts/AuthContext';

const NewSession = () => {
  const { token } = useContext(AuthProvider);

  return (
    <div className="page-container">
      <h2>Record a New Session</h2>
      <SessionForm token={token} />
    </div>
  );
};

export default NewSession;
