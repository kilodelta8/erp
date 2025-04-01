import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Link } from 'react-router-dom';
//import SalesReport from './SalesReport'; // Assuming you have this component
//import InventoryReport from './InventoryReport'; // Assuming you have this component
//import LaborReport from './LaborReport'; // Assuming you have this component
import '../css/ReportsPage.css'; // Import the CSS file
const ReportsPage = () => {
    return (_jsx(Router, { children: _jsxs("div", { className: "reports-page-container", children: [_jsxs("nav", { className: "reports-nav", children: [_jsx(Link, { to: "/reports/sales", children: "Sales Report" }), _jsx(Link, { to: "/reports/inventory", children: "Inventory Report" }), _jsx(Link, { to: "/reports/labor", children: "Labor Report" })] }), _jsx("div", { className: "reports-content", children: _jsx(Routes, {}) })] }) }));
};
export default ReportsPage;
