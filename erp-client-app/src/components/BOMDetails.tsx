import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/BOMDetails.css'; // Import the CSS file

interface BOMItem {
  id: number;
  partName: string;
  quantity: number;
  unit: string;
}

// Removed duplicate declaration of BOMDetailsParams

const BOMDetails: React.FC = () => {
  const { bomId } = useParams<Record<string, string>>(); // Use Record<string, string> for compatibility
  const [bomItems, setBOMItems] = useState<BOMItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBOMDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/boms/${bomId}/items`);
        if (!response.ok) {
          throw new Error('Failed to fetch BOM details');
        }
        const data: BOMItem[] = await response.json();
        setBOMItems(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBOMDetails();
  }, [bomId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bom-details-container">
      <h2>Bill of Materials Details (BOM ID: {bomId})</h2>
      {bomItems.length > 0 ? (
        <table className="bom-table">
          <thead>
            <tr>
              <th>Part Name</th>
              <th>Quantity</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {bomItems.map((item) => (
              <tr key={item.id}>
                <td>{item.partName}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No items found for this BOM.</div>
      )}
    </div>
  );
};

export default BOMDetails;