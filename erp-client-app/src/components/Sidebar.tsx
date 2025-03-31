import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Sidebar.css'; // Import the CSS file

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar-container">
      <nav className="sidebar-nav">
        <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
        <Link to="/customers" className="sidebar-link">Customers</Link>
        <Link to="/inventory/items" className="sidebar-link">Inventory</Link>
        <Link to="/boms" className="sidebar-link">BOMs</Link>
        <Link to="/orders" className="sidebar-link">Orders</Link>
        <Link to="/labor-entries" className="sidebar-link">Labor Entries</Link>
        <Link to="/reports/sales" className="sidebar-link">Reports</Link>
        {/* Add more navigation links as needed */}
      </nav>
    </aside>
  );
};

export default Sidebar;