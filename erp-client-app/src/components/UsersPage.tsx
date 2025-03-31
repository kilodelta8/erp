import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UsersList from './UsersList';
import UserForm from './UserForm';
import UserDetails from './UserDetails'; // Assuming you have this component
import '../css/UsersPage.css'; // Import the CSS file

const UsersPage: React.FC = () => {
  return (
    <Router>
      <div className="users-page-container">
        <nav className="users-nav">
          <Link to="/users">Users List</Link>
          <Link to="/users/create">Create User</Link>
        </nav>
        <div className="users-content">
          <Routes>
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/create" element={<UserForm />} />
            <Route path="/users/:userId" element={<UserDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default UsersPage;