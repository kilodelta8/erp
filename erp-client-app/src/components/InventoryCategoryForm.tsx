import React, { useState } from 'react';
import '../css/InventoryCategoryForm.css'; // Import the CSS file

interface InventoryCategory {
  name: string;
  description: string;
}

const InventoryCategoryForm: React.FC = () => {
  const [category, setCategory] = useState<InventoryCategory>({
    name: '',
    description: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="inventory-category-form-container">
      <h2>Create New Inventory Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Category Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={category.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={category.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Category</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default InventoryCategoryForm;