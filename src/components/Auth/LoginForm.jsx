import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logowhite from '../../assets/logowhite.png';

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5050/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      login(data); // store user + token
      navigate('/'); // redirect to dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="loginForm">
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <img src={logowhite} alt="StatMax Logo White" className="logoWhite" />
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /><br />
      <button id="loginSubmit" type="submit">LOG IN</button>
      <p>
        Not a member? <Link to="/signup">Sign up here</Link>
      </p>
    </form>
    </div>
  );
};

export default LoginForm;
