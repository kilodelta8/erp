import React from 'react';
import '../css/Dashboard.css'; // Import the CSS file

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Sales Overview</h2>
          <p>Total Sales: $10,000</p>
          <p>Monthly Sales: $2,500</p>
          {/* Add more sales-related data */}
        </div>
        <div className="dashboard-section">
          <h2>Inventory Status</h2>
          <p>Items in Stock: 150</p>
          <p>Low Stock Items: 10</p>
          {/* Add more inventory-related data */}
        </div>
        <div className="dashboard-section">
          <h2>Recent Orders</h2>
          <ul>
            <li>Order #123: $100 - Shipped</li>
            <li>Order #124: $50 - Processing</li>
            {/* Add more recent orders */}
          </ul>
        </div>
        <div className="dashboard-section">
          <h2>Customer Insights</h2>
          <p>Total Customers: 50</p>
          <p>New Customers (Last Month): 5</p>
          {/* Add more customer insight data */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;