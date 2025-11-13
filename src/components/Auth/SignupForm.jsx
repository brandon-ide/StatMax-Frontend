import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logowhite from '../../assets/logowhite.png';

const SignUpForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5050/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Signup failed');

      login(data);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signupForm">
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <img src={logowhite} alt="StatMax Logo White" className="logoWhite" />
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      /><br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /><br />
      <button id="signupSubmit" type="submit">Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </form>
    </div>
  );
};

export default SignUpForm;
