import React, { useState } from 'react';
import '../css/BOMForm.css'; // Import the CSS file

interface BOMItem {
  partName: string;
  quantity: number;
  unit: string;
}

const BOMForm: React.FC = () => {
  const [bomName, setBOMName] = useState('');
  const [items, setItems] = useState<BOMItem[]>([{ partName: '', quantity: 1, unit: 'units' }]);
  const [error, setError] = useState<string | null>(null);

  const handleAddItem = () => {
    setItems([...items, { partName: '', quantity: 1, unit: 'units' }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof BOMItem, value: string | number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      setItems([{partName: "", quantity: 1, unit: "units"}]);

    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred.");
        }
    }
  };

  return (
    <div className="bom-form-container">
      <h2>Create New Bill of Materials (BOM)</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bomName">BOM Name:</label>
          <input
            type="text"
            id="bomName"
            value={bomName}
            onChange={(e) => setBOMName(e.target.value)}
            required
          />
        </div>

        {items.map((item, index) => (
          <div key={index} className="item-row">
            <div className="form-group">
              <label htmlFor={`partName-${index}`}>Part Name:</label>
              <input
                type="text"
                id={`partName-${index}`}
                value={item.partName}
                onChange={(e) => handleItemChange(index, 'partName', e.target.value)}
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
              <label htmlFor={`unit-${index}`}>Unit:</label>
              <select
                id={`unit-${index}`}
                value={item.unit}
                onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
              >
                <option value="units">Units</option>
                <option value="meters">Meters</option>
                <option value="kilograms">Kilograms</option>
                {/* Add more units as needed */}
              </select>
            </div>
            <button type="button" onClick={() => handleRemoveItem(index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
        <button type="submit">Create BOM</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default BOMForm;