import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BOMList from './BOMsList';
import BOMDetails from './BOMDetails';
import BOMForm from './BOMForm';
import '../css/BOMPage.css'; // Import the CSS file

const BOMsPage: React.FC = () => {
  return (
    <Router>
      <div className="bom-page-container">
        <nav className="bom-nav">
          <Link to="/boms">BOM List</Link>
          <Link to="/boms/create">Create BOM</Link>
        </nav>
        <div className="bom-content">
          <Routes>
            <Route path="/boms" element={<BOMList />} />
            <Route path="/boms/:bomId" element={<BOMDetails />} />
            <Route path="/boms/create" element={<BOMForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default BOMsPage;