import React, { useState, useEffect } from 'react';
import '../css/OrderForm.css'; // Import the CSS file

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
}

const OrderForm: React.FC = () => {
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [items, setItems] = useState<OrderItem[]>([{ productName: '', quantity: 1, price: 0 }]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/customers');
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data: Customer[] = await response.json();
        setCustomers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      }
    };

    fetchCustomers();
  }, []);

  const handleAddItem = () => {
    setItems([...items, { productName: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: string | number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="order-form-container">
      <h2>Create New Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerId">Customer:</label>
          <select
            id="customerId"
            value={customerId || ''}
            onChange={(e) => setCustomerId(parseInt(e.target.value))}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.firstName} {customer.lastName}
              </option>
            ))}
          </select>
        </div>

        {items.map((item, index) => (
          <div key={index} className="item-row">
            <div className="form-group">
              <label htmlFor={`productName-${index}`}>Product Name:</label>
              <input
                type="text"
                id={`productName-${index}`}
                value={item.productName}
                onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`quantity-${index}`}>Quantity:</label>
              <input
                type="number"
                id={`quantity-${index}`}
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`price-${index}`}>Price:</label>
              <input
                type="number"
                id={`price-${index}`}
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                required
              />
            </div>
            <button type="button" onClick={() => handleRemoveItem(index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
        <button type="submit">Create Order</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default OrderForm;