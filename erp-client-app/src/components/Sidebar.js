import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import '../css/Sidebar.css'; // Import the CSS file
const Sidebar = () => {
    return (_jsx("aside", { className: "sidebar-container", children: _jsxs("nav", { className: "sidebar-nav", children: [_jsx(Link, { to: "/dashboard", className: "sidebar-link", children: "Dashboard" }), _jsx(Link, { to: "/customers", className: "sidebar-link", children: "Customers" }), _jsx(Link, { to: "/inventory/items", className: "sidebar-link", children: "Inventory" }), _jsx(Link, { to: "/boms", className: "sidebar-link", children: "BOMs" }), _jsx(Link, { to: "/orders", className: "sidebar-link", children: "Orders" }), _jsx(Link, { to: "/labor-entries", className: "sidebar-link", children: "Labor Entries" }), _jsx(Link, { to: "/reports/sales", className: "sidebar-link", children: "Reports" })] }) }));
};
export default Sidebar;
