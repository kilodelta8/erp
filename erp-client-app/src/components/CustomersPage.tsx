import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomersList from './CustomersList';
import CustomerForm from './CustomerForm';
import CustomerDetails from './CustomerDetails'; // Assuming you have a CustomerDetails component
import '../css/CustomersPage.css'; // Import the CSS file

const CustomersPage: React.FC = () => {
  return (
    <Router>
      <div className="customers-page-container">
        <nav className="customers-nav">
          <Link to="/customers">Customers List</Link>
          <Link to="/customers/create">Create Customer</Link>
        </nav>
        <div className="customers-content">
          <Routes>
            <Route path="/customers" element={<CustomersList />} />
            <Route path="/customers/create" element={<CustomerForm />} />
            <Route path="/customers/:customerId" element={<CustomerDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default CustomersPage;