import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import AnimatedBackground from "../../components/background/AnimatedBackground";
import { useAuth } from "../../hooks/useAuth";
import useCardTilt from "../../hooks/useCardTilt";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  const {
    cardRef,
    cardStyle,
    isFocused,
    handlePointerMove,
    handlePointerLeave,
    handleFocusCapture,
    handleBlurCapture,
  } = useCardTilt();

  const [formData, setFormData] = useState({
    login: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.login.trim() || !formData.password) {
      setError("Please enter username/email and password.");
      return;
    }

    try {
      await login({
        login: formData.login.trim(),
        password: formData.password,
      });

      navigate(from, { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <main className="login-page">
      <AnimatedBackground />

      <section className="login-container">
        <div
          ref={cardRef}
          className={`login-card ${isFocused ? "login-card--focused" : ""}`}
          style={cardStyle}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onFocusCapture={handleFocusCapture}
          onBlurCapture={handleBlurCapture}
        >
          <div className="login-card__content">
            <div className="login-header">
              <h1>Login</h1>
              <p>Welcome back to Appkit</p>
            </div>

            {error && <div className="login-error">{error}</div>}

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <label htmlFor="login">Username or email</label>
                <input
                  id="login"
                  type="text"
                  name="login"
                  value={formData.login}
                  onChange={handleChange}
                  placeholder="Enter username or email"
                  autoComplete="username"
                />
              </div>

              <div className="form-field">
                <div className="form-label-row">
                  <label htmlFor="password">Password</label>
                  <button
                    type="button"
                    className="forgot-password"
                    onClick={() => setError("Forgot password is not connected yet.")}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="password-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <label className="remember">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>

              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="login-footer">
              <span>Don't have an account?</span>
              <Link to="/signup">Sign up</Link>
            </div>

            <div className="demo-credentials">
              Demo: <strong>demo@gmail.com</strong> / <strong>Demo@123</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
