import React, { useState, useEffect } from 'react';
import '../css/InventoryItemForm.css'; // Import the CSS file

interface InventoryItem {
  name: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
}

interface InventoryCategory {
  id: number;
  name: string;
}

const InventoryItemForm: React.FC = () => {
  const [item, setItem] = useState<InventoryItem>({
    name: '',
    description: '',
    category: '',
    quantity: 0,
    unit: 'units',
    price: 0,
  });
  const [categories, setCategories] = useState<InventoryCategory[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/inventory/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: InventoryCategory[] = await response.json();
        setCategories(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="inventory-item-form-container">
      <h2>Create New Inventory Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={item.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={item.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" value={item.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" value={item.quantity} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="unit">Unit:</label>
          <select id="unit" name="unit" value={item.unit} onChange={handleChange}>
            <option value="units">units</option>
            <option value="meters">meters</option>
            <option value="kilograms">kilograms</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" value={item.price} onChange={handleChange} required />
        </div>
        <button type="submit">Create Item</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default InventoryItemForm;