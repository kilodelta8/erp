import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/InventoryCategoriesList.css'; // Import the CSS file
const InventoryCategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch('/api/inventory/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch inventory categories');
                }
                const data = await response.json();
                setCategories(data);
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
        fetchCategories();
    }, []);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    return (_jsxs("div", { className: "inventory-categories-list-container", children: [_jsx("h2", { children: "Inventory Categories" }), categories.length > 0 ? (_jsxs("table", { className: "inventory-categories-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Name" }), _jsx("th", { children: "Description" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: categories.map((category) => (_jsxs("tr", { children: [_jsx("td", { children: category.name }), _jsx("td", { children: category.description }), _jsx("td", { children: _jsx(Link, { to: `/inventory/categories/${category.id}`, children: "View Details" }) })] }, category.id))) })] })) : (_jsx("div", { children: "No inventory categories found." })), _jsx(Link, { to: "/inventory/categories/create", className: "create-category-link", children: "Create New Category" })] }));
};
export default InventoryCategoriesList;
