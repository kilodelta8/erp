import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/InventoryCategoryDetails.css'; // Import the CSS file

interface InventoryCategory {
  id: number;
  name: string;
  description: string;
}

interface InventoryCategoryDetailsParams {
  categoryId: string;
}

const InventoryCategoryDetails: React.FC = () => {
  const { categoryId } = useParams() as unknown as InventoryCategoryDetailsParams;
  const [category, setCategory] = useState<InventoryCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/inventory/categories/${categoryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category details');
        }
        const data: InventoryCategory = await response.json();
        setCategory(data);
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

    fetchCategoryDetails();
  }, [categoryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!category) {
    return <div>Category not found.</div>;
  }

  return (
    <div className="inventory-category-details-container">
      <h2>Inventory Category Details</h2>
      <div className="category-info">
        <p><strong>Name:</strong> {category.name}</p>
        <p><strong>Description:</strong> {category.description}</p>
      </div>
      <Link to="/inventory/categories" className="back-to-list">
        Back to Categories List
      </Link>
    </div>
  );
};

export default InventoryCategoryDetails;