import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/InventoryCategoryDetails.css'; // Import the CSS file
const InventoryCategoryDetails = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCategoryDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch(`/api/inventory/categories/${categoryId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch category details');
                }
                const data = await response.json();
                setCategory(data);
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
        fetchCategoryDetails();
    }, [categoryId]);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    if (!category) {
        return _jsx("div", { children: "Category not found." });
    }
    return (_jsxs("div", { className: "inventory-category-details-container", children: [_jsx("h2", { children: "Inventory Category Details" }), _jsxs("div", { className: "category-info", children: [_jsxs("p", { children: [_jsx("strong", { children: "Name:" }), " ", category.name] }), _jsxs("p", { children: [_jsx("strong", { children: "Description:" }), " ", category.description] })] }), _jsx(Link, { to: "/inventory/categories", className: "back-to-list", children: "Back to Categories List" })] }));
};
export default InventoryCategoryDetails;
