import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import "./Navbar.css";

function getInitials(firstName = "", lastName = "") {
  const first = firstName.trim().charAt(0);
  const last = lastName.trim().charAt(0);
  return `${first}${last || first}`.toUpperCase();
}

function Navbar() {
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsPagesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () =>
      document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  const navClass = ({ isActive }) =>
    `navbar__link ${isActive ? "navbar__link--active" : ""}`;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-icon">◈</span>
          <span>Appkit</span>
        </Link>

        <div className="navbar__navigation">
          <Link to="/#about" className="navbar__link">
            About
          </Link>

          <NavLink to="/features" className={navClass}>
            Features
          </NavLink>

          <NavLink to="/pricing" className={navClass}>
            Pricing
          </NavLink>

          <NavLink to="/blog" className={navClass}>
            Blog
          </NavLink>

          <div className="navbar__dropdown" ref={dropdownRef}>
            <button
              type="button"
              className="navbar__dropdown-trigger"
              onClick={() => setIsPagesOpen((current) => !current)}
              aria-expanded={isPagesOpen}
            >
              Pages
              <span
                className={`navbar__chevron ${
                  isPagesOpen ? "navbar__chevron--open" : ""
                }`}
              >
                ↓
              </span>
            </button>

            {isPagesOpen && (
              <div className="navbar__dropdown-menu">
                <Link
                  to="/dashboard"
                  className="navbar__dropdown-item"
                  onClick={() => setIsPagesOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/product"
                  className="navbar__dropdown-item"
                  onClick={() => setIsPagesOpen(false)}
                >
                  Product
                </Link>
                <Link
                  to="/more"
                  className="navbar__dropdown-item"
                  onClick={() => setIsPagesOpen(false)}
                >
                  More
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__cta"
            onClick={() => navigate("/pricing")}
          >
            Get Started
          </button>

          <div className="navbar__profile">
            <button
              type="button"
              className="navbar__avatar"
              title={`${user?.firstName || "User"} profile`}
            >
              {getInitials(user?.firstName, user?.lastName)}
            </button>

            <button
              type="button"
              className="navbar__logout"
              onClick={handleLogout}
              title="Logout"
              aria-label="Logout"
            >
              ⇥
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
