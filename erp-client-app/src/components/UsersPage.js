import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UsersList from './UsersList';
import UserForm from './UserForm';
import UserDetails from './UserDetails'; // Assuming you have this component
import '../css/UsersPage.css'; // Import the CSS file
const UsersPage = () => {
    return (_jsx(Router, { children: _jsxs("div", { className: "users-page-container", children: [_jsxs("nav", { className: "users-nav", children: [_jsx(Link, { to: "/users", children: "Users List" }), _jsx(Link, { to: "/users/create", children: "Create User" })] }), _jsx("div", { className: "users-content", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/users", element: _jsx(UsersList, {}) }), _jsx(Route, { path: "/users/create", element: _jsx(UserForm, {}) }), _jsx(Route, { path: "/users/:userId", element: _jsx(UserDetails, {}) })] }) })] }) }));
};
export default UsersPage;
