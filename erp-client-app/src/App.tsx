import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CustomersPage from './components/CustomersPage';
import InventoryItemsPage from './components/InventoryItemsPage';
import InventoryCategoriesPage from './components/InventoryCategoriesPage';
import BOMsPage from './components/BOMsPage';
import OrdersPage from './components/OrdersPage';
import LaborEntriesPage from './components/LaborEntriesPage';
import ReportsPage from './components/ReportsPage';
import UsersPage from './components/UsersPage';
import Login from './components/Login';
import { useState } from 'react';
import './App.css';

interface User {
  username: string;
  role: string;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [, setUser] = useState<User | null>(null);

  const handleLogin = (username: string, password: string) => {
    // Replace with your actual authentication logic
    if (username === 'test' && password === 'password') {
      setLoggedIn(true);
      setUser({ username: username, role: 'admin' }); // Example user data
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return loggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Layout onLogout={handleLogout}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/customers/*" element={<CustomersPage />} />
                  <Route path="/inventory/items/*" element={<InventoryItemsPage />} />
                  <Route path="/inventory/categories/*" element={<InventoryCategoriesPage />} />
                  <Route path="/boms/*" element={<BOMsPage />} />
                  <Route path="/orders/*" element={<OrdersPage />} />
                  <Route path="/labor-entries/*" element={<LaborEntriesPage />} />
                  <Route path="/reports/*" element={<ReportsPage />} />
                  <Route path="/users/*" element={<UsersPage />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;