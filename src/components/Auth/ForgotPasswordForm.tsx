import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import logowhite from "../../assets/logowhite.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5050/api/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data: { message?: string; error?: string } = await res.json();
      setMessage(data.message || data.error || "");

      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setMessage("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div className="forgotPasswordForm">
      <img src={logowhite} alt="StatMax Logo White" className="logoWhite" />
      {message && <p>{message}</p>}<br />
      <h1>Forgotten Password</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <button id="forgotPasswordSubmit" type="submit">
          Send Reset Email
        </button>

        <p>
          <Link to="/login">Go back to Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
