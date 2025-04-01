import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomersList from './CustomersList';
import CustomerForm from './CustomerForm';
import CustomerDetails from './CustomerDetails'; // Assuming you have a CustomerDetails component
import '../css/CustomersPage.css'; // Import the CSS file
const CustomersPage = () => {
    return (_jsx(Router, { children: _jsxs("div", { className: "customers-page-container", children: [_jsxs("nav", { className: "customers-nav", children: [_jsx(Link, { to: "/customers", children: "Customers List" }), _jsx(Link, { to: "/customers/create", children: "Create Customer" })] }), _jsx("div", { className: "customers-content", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/customers", element: _jsx(CustomersList, {}) }), _jsx(Route, { path: "/customers/create", element: _jsx(CustomerForm, {}) }), _jsx(Route, { path: "/customers/:customerId", element: _jsx(CustomerDetails, {}) })] }) })] }) }));
};
export default CustomersPage;
