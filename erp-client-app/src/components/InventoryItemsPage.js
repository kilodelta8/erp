import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InventoryItemsList from './InventoryItemsList';
import InventoryItemForm from './InventoryItemForm';
import InventoryItemDetails from './InventoryItemDetails';
import '../css/InventoryItemsPage.css'; // Import the CSS file
const InventoryItemsPage = () => {
    return (_jsx(Router, { children: _jsxs("div", { className: "inventory-items-page-container", children: [_jsxs("nav", { className: "inventory-items-nav", children: [_jsx(Link, { to: "/inventory/items", children: "Items List" }), _jsx(Link, { to: "/inventory/items/create", children: "Create Item" })] }), _jsx("div", { className: "inventory-items-content", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/inventory/items", element: _jsx(InventoryItemsList, {}) }), _jsx(Route, { path: "/inventory/items/create", element: _jsx(InventoryItemForm, {}) }), _jsx(Route, { path: "/inventory/items/:itemId", element: _jsx(InventoryItemDetails, {}) })] }) })] }) }));
};
export default InventoryItemsPage;
