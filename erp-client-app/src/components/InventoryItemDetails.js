import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/InventoryItemDetails.css'; // Import the CSS file
const InventoryItemDetails = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchItemDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch(`/api/inventory/items/${itemId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch inventory item details');
                }
                const data = await response.json();
                setItem(data);
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
        fetchItemDetails();
    }, [itemId]);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    if (!item) {
        return _jsx("div", { children: "Inventory item not found." });
    }
    return (_jsxs("div", { className: "inventory-item-details-container", children: [_jsx("h2", { children: "Inventory Item Details" }), _jsxs("div", { className: "item-info", children: [_jsxs("p", { children: [_jsx("strong", { children: "Name:" }), " ", item.name] }), _jsxs("p", { children: [_jsx("strong", { children: "Description:" }), " ", item.description] }), _jsxs("p", { children: [_jsx("strong", { children: "Category:" }), " ", item.category] }), _jsxs("p", { children: [_jsx("strong", { children: "Quantity:" }), " ", item.quantity, " ", item.unit] }), _jsxs("p", { children: [_jsx("strong", { children: "Price:" }), " $", item.price.toFixed(2)] })] }), _jsx(Link, { to: "/inventory/items", className: "back-to-list", children: "Back to Inventory Items List" })] }));
};
export default InventoryItemDetails;
