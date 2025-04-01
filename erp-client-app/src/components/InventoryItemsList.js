import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/InventoryItemsList.css'; // Import the CSS file
const InventoryItemsList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch('/api/inventory/items');
                if (!response.ok) {
                    throw new Error('Failed to fetch inventory items');
                }
                const data = await response.json();
                setItems(data);
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
        fetchItems();
    }, []);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    return (_jsxs("div", { className: "inventory-items-list-container", children: [_jsx("h2", { children: "Inventory Items" }), items.length > 0 ? (_jsxs("table", { className: "inventory-items-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Name" }), _jsx("th", { children: "Description" }), _jsx("th", { children: "Category" }), _jsx("th", { children: "Quantity" }), _jsx("th", { children: "Unit" }), _jsx("th", { children: "Price" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: items.map((item) => (_jsxs("tr", { children: [_jsx("td", { children: item.name }), _jsx("td", { children: item.description }), _jsx("td", { children: item.category }), _jsx("td", { children: item.quantity }), _jsx("td", { children: item.unit }), _jsxs("td", { children: ["$", item.price.toFixed(2)] }), _jsx("td", { children: _jsx(Link, { to: `/inventory/items/${item.id}`, children: "View Details" }) })] }, item.id))) })] })) : (_jsx("div", { children: "No inventory items found." })), _jsx(Link, { to: "/inventory/items/create", className: "create-item-link", children: "Create New Item" })] }));
};
export default InventoryItemsList;
