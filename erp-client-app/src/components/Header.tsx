import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css'; // Import the CSS file

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="logo">
        <Link to="/">ERP App</Link>
      </div>
      <nav className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/boms">BOMs</Link>
        {/* Add more navigation links as needed */}
      </nav>
    </header>
  );
};

export default Header;