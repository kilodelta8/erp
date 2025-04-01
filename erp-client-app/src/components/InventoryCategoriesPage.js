import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InventoryCategoriesList from './InventoryCategoriesList';
import InventoryCategoryForm from './InventoryCategoryForm'; // Assuming you have this component
import InventoryCategoryDetails from './InventoryCategoryDetails'; // Assuming you have this component
import '../css/InventoryCategoriesPage.css'; // Import the CSS file
const InventoryCategoriesPage = () => {
    return (_jsx(Router, { children: _jsxs("div", { className: "inventory-categories-page-container", children: [_jsxs("nav", { className: "inventory-categories-nav", children: [_jsx(Link, { to: "/inventory/categories", children: "Categories List" }), _jsx(Link, { to: "/inventory/categories/create", children: "Create Category" })] }), _jsx("div", { className: "inventory-categories-content", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/inventory/categories", element: _jsx(InventoryCategoriesList, {}) }), _jsx(Route, { path: "/inventory/categories/create", element: _jsx(InventoryCategoryForm, {}) }), _jsx(Route, { path: "/inventory/categories/:categoryId", element: _jsx(InventoryCategoryDetails, {}) })] }) })] }) }));
};
export default InventoryCategoriesPage;
