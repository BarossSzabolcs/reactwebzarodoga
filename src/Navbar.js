import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`menu ${menuOpen ? "open" : ""}`}>
        <Link to="/open" className="link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/users" className="link" onClick={() => setMenuOpen(false)}>
          Users
        </Link>
        <Link to="/diagram" className="link" onClick={() => setMenuOpen(false)}>
          Chart
        </Link>
        <Link to="/rangok" className="link" onClick={() => setMenuOpen(false)}>
          Rights
        </Link>
      </div>
      <button className="logoutButton" onClick={handleLogout}>
        Log out
      </button>
    </nav>
  );
};

export default Navbar;
