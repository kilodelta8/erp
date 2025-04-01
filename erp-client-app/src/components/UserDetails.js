import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/UserDetails.css'; // Import the CSS file
const UserDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch(`/api/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const data = await response.json();
                setUser(data);
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
        fetchUserDetails();
    }, [userId]);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    if (!user) {
        return _jsx("div", { children: "User not found." });
    }
    return (_jsxs("div", { className: "user-details-container", children: [_jsx("h2", { children: "User Details" }), _jsxs("div", { className: "user-info", children: [_jsxs("p", { children: [_jsx("strong", { children: "Username:" }), " ", user.username] }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", user.email] }), _jsxs("p", { children: [_jsx("strong", { children: "Role:" }), " ", user.role] })] }), _jsx(Link, { to: "/users", className: "back-to-list", children: "Back to Users List" })] }));
};
export default UserDetails;
