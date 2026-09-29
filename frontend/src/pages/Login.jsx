import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/api/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      login(data);
      navigate(from, { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to reach the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-showcase" aria-label="GlowHenna welcome">
        <Link to="/" className="auth-brand">GlowHenna</Link>
        <div className="auth-showcase-copy">
          <span className="auth-eyebrow">Your celebration, beautifully planned</span>
          <h1>Find the artist who makes your moment unforgettable.</h1>
          <p>
            Save your favourite designs, compare local artists, and book your
            mehndi session in a few easy steps.
          </p>
        </div>
        <div className="auth-showcase-note">
          <span className="auth-note-mark">✦</span>
          <span>Trusted inspiration for weddings, festivals, and every day worth celebrating.</span>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-form-wrap">
          <div className="auth-mobile-brand">GlowHenna</div>
          <span className="auth-eyebrow">Welcome back</span>
          <h2>Let&apos;s get you booked.</h2>
          <p className="auth-subtitle">Sign in to continue your GlowHenna journey.</p>

          {error && <div className="auth-alert" role="alert">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="auth-field">
              <span>Email address</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                autoFocus
              />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <span className="auth-input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="auth-input-action"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </span>
            </label>

            <div className="auth-form-meta">
              <span>Secure sign in</span>
              <span className="auth-secure-mark">● Your details stay private</span>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Signing you in..." : "Sign in"}
              {!loading && <span aria-hidden="true">→</span>}
            </button>
          </form>

          <p className="auth-switch">
            New to GlowHenna? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;