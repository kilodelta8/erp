import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InventoryItemsList from './InventoryItemsList';
import InventoryItemForm from './InventoryItemForm';
import InventoryItemDetails from './InventoryItemDetails';
import '../css/InventoryItemsPage.css'; // Import the CSS file

const InventoryItemsPage: React.FC = () => {
  return (
    <Router>
      <div className="inventory-items-page-container">
        <nav className="inventory-items-nav">
          <Link to="/inventory/items">Items List</Link>
          <Link to="/inventory/items/create">Create Item</Link>
        </nav>
        <div className="inventory-items-content">
          <Routes>
            <Route path="/inventory/items" element={<InventoryItemsList />} />
            <Route path="/inventory/items/create" element={<InventoryItemForm />} />
            <Route path="/inventory/items/:itemId" element={<InventoryItemDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default InventoryItemsPage;