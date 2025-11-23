import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import logowhite from '../../assets/logowhite.png';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5050/api/auth/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    setMessage(data.message);
    setTimeout(() => {
      navigate('/login');
      }, 3000);
  };

  return (
    <div className="resetPasswordForm">
      <img src={logowhite} alt="StatMax Logo White" className="logoWhite" />
      <h1>Reset Your Password</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button id="resetPasswordSubmit" type="submit">Reset Password</button>
        <p>
        <Link to="/login">Go to Login</Link>
        </p>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
