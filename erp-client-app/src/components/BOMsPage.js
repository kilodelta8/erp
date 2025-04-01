import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BOMList from './BOMsList';
import BOMDetails from './BOMDetails';
import BOMForm from './BOMForm';
import '../css/BOMsPage.css'; // Import the CSS file
const BOMsPage = () => {
    return (_jsx(Router, { children: _jsxs("div", { className: "bom-page-container", children: [_jsxs("nav", { className: "bom-nav", children: [_jsx(Link, { to: "/boms", children: "BOM List" }), _jsx(Link, { to: "/boms/create", children: "Create BOM" })] }), _jsx("div", { className: "bom-content", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/boms", element: _jsx(BOMList, {}) }), _jsx(Route, { path: "/boms/:bomId", element: _jsx(BOMDetails, {}) }), _jsx(Route, { path: "/boms/create", element: _jsx(BOMForm, {}) })] }) })] }) }));
};
export default BOMsPage;
