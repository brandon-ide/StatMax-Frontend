import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logowhite from '../../assets/logowhite.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5050/api/auth/request-password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
    setTimeout(() => {
    navigate('/login');
    }, 3000);
  };

  return (
    <div className="forgotPasswordForm">
      <img src={logowhite} alt="StatMax Logo White" className="logoWhite" />
      <h1>Forgotten Password</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <button id="forgotPasswordSubmit" type="submit">Send Reset Email</button>
        <p>
        <Link to="/login">Go back to Login</Link>
        </p>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
