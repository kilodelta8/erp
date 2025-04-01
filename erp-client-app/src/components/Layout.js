import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from './Header'; // Assuming you have a Header component
import '../css/Layout.css'; // Import the CSS file
const Layout = ({ children }) => {
    return (_jsxs("div", { className: "layout-container", children: [_jsx(Header, {}), _jsx("main", { className: "main-content", children: children })] }));
};
export default Layout;
