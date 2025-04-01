import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [, setUser] = useState(null);
    const handleLogin = (username, password) => {
        // Replace with your actual authentication logic
        if (username === 'test' && password === 'password') {
            setLoggedIn(true);
            setUser({ username: username, role: 'admin' }); // Example user data
        }
        else {
            alert('Invalid credentials');
        }
    };
    const handleLogout = () => {
        setLoggedIn(false);
        setUser(null);
    };
    const PrivateRoute = ({ children }) => {
        return loggedIn ? children : _jsx(Navigate, { to: "/login" });
    };
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, { onLogin: handleLogin }) }), _jsx(Route, { path: "/*", element: _jsx(PrivateRoute, { children: _jsx(Layout, { onLogout: handleLogout, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/customers/*", element: _jsx(CustomersPage, {}) }), _jsx(Route, { path: "/inventory/items/*", element: _jsx(InventoryItemsPage, {}) }), _jsx(Route, { path: "/inventory/categories/*", element: _jsx(InventoryCategoriesPage, {}) }), _jsx(Route, { path: "/boms/*", element: _jsx(BOMsPage, {}) }), _jsx(Route, { path: "/orders/*", element: _jsx(OrdersPage, {}) }), _jsx(Route, { path: "/labor-entries/*", element: _jsx(LaborEntriesPage, {}) }), _jsx(Route, { path: "/reports/*", element: _jsx(ReportsPage, {}) }), _jsx(Route, { path: "/users/*", element: _jsx(UsersPage, {}) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/dashboard" }) })] }) }) }) })] }) }));
}
export default App;
