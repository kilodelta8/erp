import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/InventoryItemDetails.css'; // Import the CSS file

interface InventoryItem {
  id: number;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
}


const InventoryItemDetails: React.FC = () => {
  const { itemId } = useParams() as Record<string, string>;
  const [item, setItem] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/inventory/items/${itemId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch inventory item details');
        }
        const data: InventoryItem = await response.json();
        setItem(data);
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

    fetchItemDetails();
  }, [itemId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>Inventory item not found.</div>;
  }

  return (
    <div className="inventory-item-details-container">
      <h2>Inventory Item Details</h2>
      <div className="item-info">
        <p><strong>Name:</strong> {item.name}</p>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Quantity:</strong> {item.quantity} {item.unit}</p>
        <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
      </div>
      <Link to="/inventory/items" className="back-to-list">
        Back to Inventory Items List
      </Link>
    </div>
  );
};

export default InventoryItemDetails;