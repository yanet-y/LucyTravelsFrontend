import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaPlaneDeparture,
  FaCog,
  FaClipboardList,
} from "react-icons/fa";
import { MdOutlineBookOnline } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/Lucy Travels.png";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRestrictedNavigation = (path) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow">
      <div className="container mx-1">
        <Link to="/" className="navbar-brand d-flex align-items-center fw-bold">
          <img
            src={logo}
            alt="logo"
            width="70"
            height="70"
            className="rounded-circle"
          />
          <h2 className="p-3 logo-name m-0">Lucy Travels</h2>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user?.role === "admin" ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/admin">
                    <FaCog className="me-1" /> Manage Tours
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/admin/bookings">
                    <FaClipboardList className="me-1" /> Manage Bookings
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button
                    className="nav-link text-dark"
                    onClick={() => handleRestrictedNavigation("/home")}
                  >
                    <FaPlaneDeparture className="me-1" /> Tour Packages
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link text-dark"
                    onClick={() => handleRestrictedNavigation("/bookings")}
                  >
                    <MdOutlineBookOnline className="me-1" /> My Bookings
                  </button>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex ms-auto justify-content-right">
            {user ? (
              <button className="btn btn-danger me-4" onClick={handleLogout}>
                <FaSignOutAlt className="me-1" /> Logout
              </button>
            ) : (
              <>
                <Link className="btn btn-primary me-4" to="/login">
                  <FaSignInAlt className="me-1" /> Login
                </Link>
                <Link className="btn btn-success me-4" to="/signup">
                  <FaUser className="me-1" /> Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
