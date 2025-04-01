import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import '../css/InventoryItemForm.css'; // Import the CSS file
const InventoryItemForm = () => {
    const [item, setItem] = useState({
        name: '',
        description: '',
        category: '',
        quantity: 0,
        unit: 'units',
        price: 0,
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/inventory/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
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
        };
        fetchCategories();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch('/api/inventory/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            if (!response.ok) {
                throw new Error('Failed to create inventory item');
            }
            console.log('Inventory item created successfully');
            setItem({ name: '', description: '', category: '', quantity: 0, unit: 'units', price: 0 });
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
    return (_jsxs("div", { className: "inventory-item-form-container", children: [_jsx("h2", { children: "Create New Inventory Item" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "name", children: "Name:" }), _jsx("input", { type: "text", id: "name", name: "name", value: item.name, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "description", children: "Description:" }), _jsx("textarea", { id: "description", name: "description", value: item.description, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "category", children: "Category:" }), _jsxs("select", { id: "category", name: "category", value: item.category, onChange: handleChange, required: true, children: [_jsx("option", { value: "", children: "Select Category" }), categories.map((cat) => (_jsx("option", { value: cat.name, children: cat.name }, cat.id)))] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "quantity", children: "Quantity:" }), _jsx("input", { type: "number", id: "quantity", name: "quantity", value: item.quantity, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "unit", children: "Unit:" }), _jsxs("select", { id: "unit", name: "unit", value: item.unit, onChange: handleChange, children: [_jsx("option", { value: "units", children: "units" }), _jsx("option", { value: "meters", children: "meters" }), _jsx("option", { value: "kilograms", children: "kilograms" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "price", children: "Price:" }), _jsx("input", { type: "number", id: "price", name: "price", value: item.price, onChange: handleChange, required: true })] }), _jsx("button", { type: "submit", children: "Create Item" }), error && _jsx("div", { className: "error-message", children: error })] })] }));
};
export default InventoryItemForm;
