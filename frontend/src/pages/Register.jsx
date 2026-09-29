import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function getPasswordStrength(password) {
  if (!password) return { label: "", level: 0 };

  let level = 0;
  if (password.length >= 6) level += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) level += 1;
  if (/\d|[^A-Za-z0-9]/.test(password)) level += 1;

  return {
    label: level === 1 ? "Needs a little more strength" : level === 2 ? "Good password" : "Strong password",
    level,
  };
}

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const strength = getPasswordStrength(password);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Your password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/api/auth/register", {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      login(data);
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-showcase auth-showcase-register" aria-label="GlowHenna membership">
        <Link to="/" className="auth-brand">GlowHenna</Link>
        <div className="auth-showcase-copy">
          <span className="auth-eyebrow">A little more you</span>
          <h1>Make every design part of your story.</h1>
          <p>
            Build your personal collection of mehndi inspiration and find the
            right artist for the occasion.
          </p>
        </div>
        <div className="auth-showcase-note">
          <span className="auth-note-mark">✦</span>
          <span>One account. Favourite designs, easier bookings, and more beautiful plans.</span>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-form-wrap">
          <div className="auth-mobile-brand">GlowHenna</div>
          <span className="auth-eyebrow">Join the community</span>
          <h2>Start your celebration.</h2>
          <p className="auth-subtitle">Create an account and make your next booking feel effortless.</p>

          {error && <div className="auth-alert" role="alert">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="auth-field">
              <span>Full name</span>
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="What should we call you?"
                autoComplete="name"
                required
                autoFocus
              />
            </label>

            <label className="auth-field">
              <span>Email address</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="auth-field">
              <span>Create a password</span>
              <span className="auth-input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  minLength="6"
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

            {password && (
              <div className="password-strength" aria-live="polite">
                <div className="password-bars" aria-hidden="true">
                  {[1, 2, 3].map((bar) => (
                    <span key={bar} className={bar <= strength.level ? `strength-${strength.level}` : ""} />
                  ))}
                </div>
                <span>{strength.label}</span>
              </div>
            )}

            <label className="auth-field">
              <span>Confirm password</span>
              <span className="auth-input-wrap">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Type it once more"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="auth-input-action"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </span>
            </label>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Creating your account..." : "Create account"}
              {!loading && <span aria-hidden="true">→</span>}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;