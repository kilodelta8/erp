import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import '../css/UserForm.css'; // Import the CSS file
const UserForm = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        role: 'user', // Default role
    });
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            // Handle successful creation (e.g., redirect, show message)
            console.log('User created successfully');
            setUser({ username: '', email: '', role: 'user' });
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError('An unknown error occurred.');
            }
        }
    };
    return (_jsxs("div", { className: "user-form-container", children: [_jsx("h2", { children: "Create New User" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "username", children: "Username:" }), _jsx("input", { type: "text", id: "username", name: "username", value: user.username, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: "Email:" }), _jsx("input", { type: "email", id: "email", name: "email", value: user.email, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "role", children: "Role:" }), _jsxs("select", { id: "role", name: "role", value: user.role, onChange: handleChange, required: true, children: [_jsx("option", { value: "user", children: "User" }), _jsx("option", { value: "admin", children: "Admin" })] })] }), _jsx("button", { type: "submit", children: "Create User" }), error && _jsx("div", { className: "error-message", children: error })] })] }));
};
export default UserForm;
