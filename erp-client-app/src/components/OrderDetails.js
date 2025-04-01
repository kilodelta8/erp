import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/OrderDetails.css'; // Import the CSS file
const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch(`/api/orders/${orderId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch order details');
                }
                const data = await response.json();
                setOrder(data);
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
        fetchOrderDetails();
    }, [orderId]);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    if (!order) {
        return _jsx("div", { children: "Order not found." });
    }
    return (_jsxs("div", { className: "order-details-container", children: [_jsx("h2", { children: "Order Details" }), _jsxs("div", { className: "order-info", children: [_jsxs("p", { children: [_jsx("strong", { children: "Order Number:" }), " ", order.orderNumber] }), _jsxs("p", { children: [_jsx("strong", { children: "Customer ID:" }), " ", order.customerId] }), _jsxs("p", { children: [_jsx("strong", { children: "Order Date:" }), " ", new Date(order.orderDate).toLocaleDateString()] }), _jsx("h3", { children: "Order Items:" }), _jsxs("table", { className: "order-items-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Product Name" }), _jsx("th", { children: "Quantity" }), _jsx("th", { children: "Price" }), _jsx("th", { children: "Total" })] }) }), _jsx("tbody", { children: order.items.map((item) => (_jsxs("tr", { children: [_jsx("td", { children: item.productName }), _jsx("td", { children: item.quantity }), _jsxs("td", { children: ["$", item.price.toFixed(2)] }), _jsxs("td", { children: ["$", (item.quantity * item.price).toFixed(2)] })] }, item.id))) })] }), _jsxs("p", { children: [_jsx("strong", { children: "Total Amount:" }), " $", order.totalAmount.toFixed(2)] })] }), _jsx(Link, { to: "/orders", className: "back-to-list", children: "Back to Orders List" })] }));
};
export default OrderDetails;
