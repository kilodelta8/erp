import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InventoryCategoriesList from './InventoryCategoriesList';
import InventoryCategoryForm from './InventoryCategoryForm'; // Assuming you have this component
import InventoryCategoryDetails from './InventoryCategoryDetails'; // Assuming you have this component
import '../css/InventoryCategoriesPage.css'; // Import the CSS file

const InventoryCategoriesPage: React.FC = () => {
  return (
    <Router>
      <div className="inventory-categories-page-container">
        <nav className="inventory-categories-nav">
          <Link to="/inventory/categories">Categories List</Link>
          <Link to="/inventory/categories/create">Create Category</Link>
        </nav>
        <div className="inventory-categories-content">
          <Routes>
            <Route path="/inventory/categories" element={<InventoryCategoriesList />} />
            <Route path="/inventory/categories/create" element={<InventoryCategoryForm />} />
            <Route path="/inventory/categories/:categoryId" element={<InventoryCategoryDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default InventoryCategoriesPage;