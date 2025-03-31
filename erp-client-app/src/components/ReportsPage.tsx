import React from 'react';
import { BrowserRouter as Router, Routes, Link } from 'react-router-dom';
//import SalesReport from './SalesReport'; // Assuming you have this component
//import InventoryReport from './InventoryReport'; // Assuming you have this component
//import LaborReport from './LaborReport'; // Assuming you have this component
import '../css/ReportsPage.css'; // Import the CSS file

const ReportsPage: React.FC = () => {
  return (
    <Router>
      <div className="reports-page-container">
        <nav className="reports-nav">
          <Link to="/reports/sales">Sales Report</Link>
          <Link to="/reports/inventory">Inventory Report</Link>
          <Link to="/reports/labor">Labor Report</Link>
        </nav>
        <div className="reports-content">
          <Routes>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default ReportsPage;