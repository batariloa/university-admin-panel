import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/logo.png";
import "./css/Navbar.css";

export function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const isAdmin = user && user.data.role === "Admin";

  //logout
  const handleLogoutClick = async () => {
    await logout();
  };

  // Toggle navbar on mobile
  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  // Close navbar on item click
  const handleNavbarItemClick = () => {
    setIsNavbarOpen(false);
  };

  // jsx
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`}
        >
          <a href="/" className="navbar-brand">
            <img
              src={logo}
              alt="Logo"
              className="navbar-logo"
              style={{ width: "230px" }}
            />
          </a>
          {user && (
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0"
              onClick={handleNavbarItemClick}
            >
              <li key="newPost" className="nav-item">
                <Link to="/students" className="nav-link " aria-current="page">
                  Students
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/courses" className="nav-link">
                  Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/professors" className="nav-link">
                  Professors
                </Link>
              </li>
              {isAdmin && (
                <li key="register" className="nav-item">
                  <Link
                    to="/register"
                    className="nav-link "
                    aria-current="page"
                  >
                    Register User
                  </Link>
                </li>
              )}
              <li key="logout" className="nav-item">
                <Link className="nav-link" onClick={handleLogoutClick}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    style={{ marginRight: "5px" }}
                  />
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
