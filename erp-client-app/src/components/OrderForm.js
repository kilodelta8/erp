import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import '../css/OrderForm.css'; // Import the CSS file
const OrderForm = () => {
    const [customerId, setCustomerId] = useState(null);
    const [items, setItems] = useState([{ productName: '', quantity: 1, price: 0 }]);
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('/api/customers');
                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }
                const data = await response.json();
                setCustomers(data);
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
        fetchCustomers();
    }, []);
    const handleAddItem = () => {
        setItems([...items, { productName: '', quantity: 1, price: 0 }]);
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
        if (!customerId) {
            setError('Please select a customer.');
            return;
        }
        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customerId, items }),
            });
            if (!response.ok) {
                throw new Error('Failed to create order');
            }
            // Handle successful creation (e.g., redirect, show message)
            console.log('Order created successfully');
            setCustomerId(null);
            setItems([{ productName: '', quantity: 1, price: 0 }]);
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
    return (_jsxs("div", { className: "order-form-container", children: [_jsx("h2", { children: "Create New Order" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "customerId", children: "Customer:" }), _jsxs("select", { id: "customerId", value: customerId || '', onChange: (e) => setCustomerId(parseInt(e.target.value)), required: true, children: [_jsx("option", { value: "", children: "Select Customer" }), customers.map((customer) => (_jsxs("option", { value: customer.id, children: [customer.firstName, " ", customer.lastName] }, customer.id)))] })] }), items.map((item, index) => (_jsxs("div", { className: "item-row", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: `productName-${index}`, children: "Product Name:" }), _jsx("input", { type: "text", id: `productName-${index}`, value: item.productName, onChange: (e) => handleItemChange(index, 'productName', e.target.value), required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: `quantity-${index}`, children: "Quantity:" }), _jsx("input", { type: "number", id: `quantity-${index}`, value: item.quantity, onChange: (e) => handleItemChange(index, 'quantity', parseInt(e.target.value)), required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: `price-${index}`, children: "Price:" }), _jsx("input", { type: "number", id: `price-${index}`, value: item.price, onChange: (e) => handleItemChange(index, 'price', parseFloat(e.target.value)), required: true })] }), _jsx("button", { type: "button", onClick: () => handleRemoveItem(index), children: "Remove" })] }, index))), _jsx("button", { type: "button", onClick: handleAddItem, children: "Add Item" }), _jsx("button", { type: "submit", children: "Create Order" }), error && _jsx("div", { className: "error-message", children: error })] })] }));
};
export default OrderForm;
