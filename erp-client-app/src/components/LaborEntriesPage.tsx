import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LaborEntriesList from './LaborEntriesList';
import LaborEntryForm from './LaborEntryForm';
import LaborEntryDetails from './LaborEntryDetails';
import '../css/LaborEntriesPage.css'; // Import the CSS file

const LaborEntriesPage: React.FC = () => {
  return (
    <Router>
      <div className="labor-entries-page-container">
        <nav className="labor-entries-nav">
          <Link to="/labor-entries">Labor Entries List</Link>
          <Link to="/labor-entries/create">Create Labor Entry</Link>
        </nav>
        <div className="labor-entries-content">
          <Routes>
            <Route path="/labor-entries" element={<LaborEntriesList />} />
            <Route path="/labor-entries/create" element={<LaborEntryForm />} />
            <Route path="/labor-entries/:entryId" element={<LaborEntryDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default LaborEntriesPage;