import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrdersList from './OrdersList';
import OrderForm from './OrderForm';
import OrderDetails from './OrderDetails';
import '../css/OrdersPage.css'; // Import the CSS file
const OrdersPage = () => {
    return (_jsx(Router, { children: _jsxs("div", { className: "orders-page-container", children: [_jsxs("nav", { className: "orders-nav", children: [_jsx(Link, { to: "/orders", children: "Orders List" }), _jsx(Link, { to: "/orders/create", children: "Create Order" })] }), _jsx("div", { className: "orders-content", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/orders", element: _jsx(OrdersList, {}) }), _jsx(Route, { path: "/orders/create", element: _jsx(OrderForm, {}) }), _jsx(Route, { path: "/orders/:orderId", element: _jsx(OrderDetails, {}) })] }) })] }) }));
};
export default OrdersPage;
