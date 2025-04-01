import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import '../css/Header.css'; // Import the CSS file
const Header = () => {
    return (_jsxs("header", { className: "header-container", children: [_jsx("div", { className: "logo", children: _jsx(Link, { to: "/", children: "ERP App" }) }), _jsxs("nav", { className: "nav-links", children: [_jsx(Link, { to: "/dashboard", children: "Dashboard" }), _jsx(Link, { to: "/customers", children: "Customers" }), _jsx(Link, { to: "/boms", children: "BOMs" })] })] }));
};
export default Header;
