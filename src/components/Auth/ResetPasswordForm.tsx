import { useState, FormEvent } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import logowhite from '../../assets/logowhite.png';

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await fetch(`https://statmax-backend.onrender.com/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      setMessage(data.message);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Failed to reset password.");
    }
  };

  return (
    <div className="resetPasswordForm">
      <img src={logowhite} alt="StatMax Logo White" className="mobileLogoWhite" />
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
