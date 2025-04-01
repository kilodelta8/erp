import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/OrdersList.css'; // Import the CSS file
const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch('/api/orders');
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
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
        fetchOrders();
    }, []);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    return (_jsxs("div", { className: "orders-list-container", children: [_jsx("h2", { children: "Orders List" }), orders.length > 0 ? (_jsxs("table", { className: "orders-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Order Number" }), _jsx("th", { children: "Customer ID" }), _jsx("th", { children: "Order Date" }), _jsx("th", { children: "Total Amount" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: orders.map((order) => (_jsxs("tr", { children: [_jsx("td", { children: order.orderNumber }), _jsx("td", { children: order.customerId }), _jsx("td", { children: new Date(order.orderDate).toLocaleDateString() }), _jsxs("td", { children: ["$", order.totalAmount.toFixed(2)] }), _jsx("td", { children: _jsx(Link, { to: `/orders/${order.id}`, children: "View Details" }) })] }, order.id))) })] })) : (_jsx("div", { children: "No orders found." })), _jsx(Link, { to: "/orders/create", className: "create-order-link", children: "Create New Order" })] }));
};
export default OrdersList;
