import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/InventoryItemsList.css'; // Import the CSS file

interface InventoryItem {
  id: number;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
}

const InventoryItemsList: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/inventory/items');
        if (!response.ok) {
          throw new Error('Failed to fetch inventory items');
        }
        const data: InventoryItem[] = await response.json();
        setItems(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="inventory-items-list-container">
      <h2>Inventory Items</h2>
      {items.length > 0 ? (
        <table className="inventory-items-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <Link to={`/inventory/items/${item.id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No inventory items found.</div>
      )}
      <Link to="/inventory/items/create" className="create-item-link">
        Create New Item
      </Link>
    </div>
  );
};

export default InventoryItemsList;