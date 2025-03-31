import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/InventoryCategoriesList.css'; // Import the CSS file

interface InventoryCategory {
  id: number;
  name: string;
  description: string;
}

const InventoryCategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<InventoryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/inventory/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch inventory categories');
        }
        const data: InventoryCategory[] = await response.json();
        setCategories(data);
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

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="inventory-categories-list-container">
      <h2>Inventory Categories</h2>
      {categories.length > 0 ? (
        <table className="inventory-categories-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <Link to={`/inventory/categories/${category.id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No inventory categories found.</div>
      )}
      <Link to="/inventory/categories/create" className="create-category-link">
        Create New Category
      </Link>
    </div>
  );
};

export default InventoryCategoriesList;