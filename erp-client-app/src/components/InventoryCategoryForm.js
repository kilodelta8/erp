import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import '../css/InventoryCategoryForm.css'; // Import the CSS file
const InventoryCategoryForm = () => {
    const [category, setCategory] = useState({
        name: '',
        description: '',
    });
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/inventory/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category),
            });
            if (!response.ok) {
                throw new Error('Failed to create inventory category');
            }
            // Handle successful creation (e.g., redirect, show message)
            console.log('Inventory category created successfully');
            setCategory({ name: '', description: '' });
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError('An unknown error occurred.');
            }
        }
    };
    return (_jsxs("div", { className: "inventory-category-form-container", children: [_jsx("h2", { children: "Create New Inventory Category" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "name", children: "Category Name:" }), _jsx("input", { type: "text", id: "name", name: "name", value: category.name, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "description", children: "Description:" }), _jsx("textarea", { id: "description", name: "description", value: category.description, onChange: handleChange, required: true })] }), _jsx("button", { type: "submit", children: "Create Category" }), error && _jsx("div", { className: "error-message", children: error })] })] }));
};
export default InventoryCategoryForm;
