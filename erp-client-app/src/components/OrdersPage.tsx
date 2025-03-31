import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrdersList from './OrdersList';
import OrderForm from './OrderForm';
import OrderDetails from './OrderDetails';
import '../css/OrdersPage.css'; // Import the CSS file

const OrdersPage: React.FC = () => {
  return (
    <Router>
      <div className="orders-page-container">
        <nav className="orders-nav">
          <Link to="/orders">Orders List</Link>
          <Link to="/orders/create">Create Order</Link>
        </nav>
        <div className="orders-content">
          <Routes>
            <Route path="/orders" element={<OrdersList />} />
            <Route path="/orders/create" element={<OrderForm />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default OrdersPage;