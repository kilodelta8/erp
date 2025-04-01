import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/UsersList.css'; // Import the CSS file
const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
            }
            catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
                else {
                    setError('An unknown error occurred.');
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    return (_jsxs("div", { className: "users-list-container", children: [_jsx("h2", { children: "Users List" }), users.length > 0 ? (_jsxs("table", { className: "users-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Username" }), _jsx("th", { children: "Email" }), _jsx("th", { children: "Role" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: users.map((user) => (_jsxs("tr", { children: [_jsx("td", { children: user.username }), _jsx("td", { children: user.email }), _jsx("td", { children: user.role }), _jsx("td", { children: _jsx(Link, { to: `/users/${user.id}`, children: "View Details" }) })] }, user.id))) })] })) : (_jsx("div", { children: "No users found." })), _jsx(Link, { to: "/users/create", className: "create-user-link", children: "Create New User" })] }));
};
export default UsersList;
