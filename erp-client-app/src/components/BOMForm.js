import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import '../css/BOMForm.css'; // Import the CSS file
const BOMForm = () => {
    const [bomName, setBOMName] = useState('');
    const [items, setItems] = useState([{ partName: '', quantity: 1, unit: 'units' }]);
    const [error, setError] = useState(null);
    const handleAddItem = () => {
        setItems([...items, { partName: '', quantity: 1, unit: 'units' }]);
    };
    const handleRemoveItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };
    const handleItemChange = (index, field, value) => {
        const updatedItems = items.map((item, i) => i === index ? { ...item, [field]: value } : item);
        setItems(updatedItems);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/boms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bomName, items }),
            });
            if (!response.ok) {
                throw new Error('Failed to create BOM');
            }
            // Handle successful creation (e.g., redirect, show message)
            console.log('BOM created successfully');
            setBOMName("");
            setItems([{ partName: "", quantity: 1, unit: "units" }]);
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError("An unknown error occurred.");
            }
        }
    };
    return (_jsxs("div", { className: "bom-form-container", children: [_jsx("h2", { children: "Create New Bill of Materials (BOM)" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "bomName", children: "BOM Name:" }), _jsx("input", { type: "text", id: "bomName", value: bomName, onChange: (e) => setBOMName(e.target.value), required: true })] }), items.map((item, index) => (_jsxs("div", { className: "item-row", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: `partName-${index}`, children: "Part Name:" }), _jsx("input", { type: "text", id: `partName-${index}`, value: item.partName, onChange: (e) => handleItemChange(index, 'partName', e.target.value), required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: `quantity-${index}`, children: "Quantity:" }), _jsx("input", { type: "number", id: `quantity-${index}`, value: item.quantity, onChange: (e) => handleItemChange(index, 'quantity', parseInt(e.target.value)), required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: `unit-${index}`, children: "Unit:" }), _jsxs("select", { id: `unit-${index}`, value: item.unit, onChange: (e) => handleItemChange(index, 'unit', e.target.value), children: [_jsx("option", { value: "units", children: "Units" }), _jsx("option", { value: "meters", children: "Meters" }), _jsx("option", { value: "kilograms", children: "Kilograms" })] })] }), _jsx("button", { type: "button", onClick: () => handleRemoveItem(index), children: "Remove" })] }, index))), _jsx("button", { type: "button", onClick: handleAddItem, children: "Add Item" }), _jsx("button", { type: "submit", children: "Create BOM" }), error && _jsx("div", { className: "error-message", children: error })] })] }));
};
export default BOMForm;
