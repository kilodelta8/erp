import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import '../css/CustomerForm.css'; // Import the CSS file
const CustomerForm = () => {
    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
    });
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer),
            });
            if (!response.ok) {
                throw new Error('Failed to create customer');
            }
            // Handle successful creation (e.g., redirect, show message)
            console.log('Customer created successfully');
            setCustomer({ firstName: "", lastName: "", email: "", phone: "", address: "" });
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError("An unknown error occurred.");
            }
        }
    };
    return (_jsxs("div", { className: "customer-form-container", children: [_jsx("h2", { children: "Create New Customer" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "firstName", children: "First Name:" }), _jsx("input", { type: "text", id: "firstName", name: "firstName", value: customer.firstName, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "lastName", children: "Last Name:" }), _jsx("input", { type: "text", id: "lastName", name: "lastName", value: customer.lastName, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: "Email:" }), _jsx("input", { type: "email", id: "email", name: "email", value: customer.email, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "phone", children: "Phone:" }), _jsx("input", { type: "tel", id: "phone", name: "phone", value: customer.phone, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "address", children: "Address:" }), _jsx("textarea", { id: "address", name: "address", value: customer.address, onChange: handleChange, required: true })] }), _jsx("button", { type: "submit", children: "Create Customer" }), error && _jsx("div", { className: "error-message", children: error })] })] }));
};
export default CustomerForm;
