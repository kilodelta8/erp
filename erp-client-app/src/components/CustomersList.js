import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/CustomersList.css'; // Import the CSS file
const CustomersList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch('/api/customers');
                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }
                const data = await response.json();
                setCustomers(data);
            }
            catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
                else {
                    setError("An unknown error occurred.");
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    return (_jsxs("div", { className: "customers-list-container", children: [_jsx("h2", { children: "Customers List" }), customers.length > 0 ? (_jsxs("table", { className: "customers-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "First Name" }), _jsx("th", { children: "Last Name" }), _jsx("th", { children: "Email" }), _jsx("th", { children: "Phone" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: customers.map((customer) => (_jsxs("tr", { children: [_jsx("td", { children: customer.firstName }), _jsx("td", { children: customer.lastName }), _jsx("td", { children: customer.email }), _jsx("td", { children: customer.phone }), _jsx("td", { children: _jsx(Link, { to: `/customers/${customer.id}`, children: "View Details" }) })] }, customer.id))) })] })) : (_jsx("div", { children: "No customers found." })), _jsx(Link, { to: "/customers/create", className: "create-customer-link", children: "Create New Customer" })] }));
};
export default CustomersList;
