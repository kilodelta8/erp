import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/CustomerDetails.css'; // Import the CSS file
const CustomerDetails = () => {
    const { customerId } = useParams();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCustomerDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch(`/api/customers/${customerId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch customer details');
                }
                const data = await response.json();
                setCustomer(data);
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
        fetchCustomerDetails();
    }, [customerId]);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    if (!customer) {
        return _jsx("div", { children: "Customer not found." });
    }
    return (_jsxs("div", { className: "customer-details-container", children: [_jsx("h2", { children: "Customer Details" }), _jsxs("div", { className: "customer-info", children: [_jsxs("p", { children: [_jsx("strong", { children: "First Name:" }), " ", customer.firstName] }), _jsxs("p", { children: [_jsx("strong", { children: "Last Name:" }), " ", customer.lastName] }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", customer.email] }), _jsxs("p", { children: [_jsx("strong", { children: "Phone:" }), " ", customer.phone] }), _jsxs("p", { children: [_jsx("strong", { children: "Address:" }), " ", customer.address] })] }), _jsx(Link, { to: "/customers", className: "back-to-list", children: "Back to Customers List" })] }));
};
export default CustomerDetails;
