import { useState } from "react";
import { Link, useNavigate } from "react-router";

import AnimatedBackground from "../../components/background/AnimatedBackground";
import { signupUser } from "../../services/authService";

import "./Signup.css";

const initialForm = {
  username: "",
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const validate = () => {
    if (!formData.username.trim()) return "Username is required.";
    if (!formData.firstName.trim()) return "First name is required.";
    if (!formData.gender) return "Please select your gender.";
    if (!formData.email.trim()) return "Email is required.";
    if (!formData.phone.trim()) return "Phone number is required.";

    if (!/^\+?[0-9\s()-]{7,20}$/.test(formData.phone.trim())) {
      return "Please enter a valid phone number.";
    }

    if (formData.password.length < 8) {
      return "Password must contain at least 8 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);

      await signupUser(formData);

      setSuccess("Account created successfully. Redirecting to login...");

      setFormData(initialForm);

      window.setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="signup-page">
      <AnimatedBackground />

      <section className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h1>Create Account</h1>
            <p>Start your Appkit journey</p>
          </div>

          {error && (
            <div className="signup-message signup-message--error">
              {error}
            </div>
          )}

          {success && (
            <div className="signup-message signup-message--success">
              {success}
            </div>
          )}

          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            <div className="signup-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                autoComplete="username"
              />
            </div>

            <div className="signup-grid">
              <div className="signup-field">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  autoComplete="given-name"
                />
              </div>

              <div className="signup-field">
                <label htmlFor="lastName">
                  Last name <span>Optional</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="signup-field">
              <span className="signup-label">Gender</span>

              <div className="gender-options">
                {["male", "female", "other"].map((gender) => (
                  <label className="gender-option" key={gender}>
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                    />
                    <span>
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="signup-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="signup-field">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                autoComplete="tel"
              />
            </div>

            <div className="signup-field">
              <label htmlFor="signup-password">Password</label>
              <div className="signup-password">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="signup-field">
              <label htmlFor="confirmPassword">Confirm password</label>
              <div className="signup-password">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((current) => !current)
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="signup-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="signup-footer">
            <span>Already have an account?</span>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;
