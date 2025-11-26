import { useState, useContext, FormEvent } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logowhite from '../../assets/logowhite.png';

const LoginForm = () => {
  const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext must be used within an AuthProvider");
  const { login } = authContext;
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5050/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      login(data);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="loginForm">
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <img src={logowhite} alt="StatMax Logo White" className="mobileLogoWhite" />
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
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <p>
          Not a member? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
