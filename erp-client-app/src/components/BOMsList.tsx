import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/BOMsList.css'; // Import the CSS file

interface BOM {
  id: number;
  bomName: string;
  createdAt: string;
}

const BOMList: React.FC = () => {
  const [boms, setBOMs] = useState<BOM[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBOMs = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/boms');
        if (!response.ok) {
          throw new Error('Failed to fetch BOMs');
        }
        const data: BOM[] = await response.json();
        setBOMs(data);
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

    fetchBOMs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bom-list-container">
      <h2>Bill of Materials (BOMs)</h2>
      {boms.length > 0 ? (
        <table className="bom-table">
          <thead>
            <tr>
              <th>BOM Name</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {boms.map((bom) => (
              <tr key={bom.id}>
                <td>{bom.bomName}</td>
                <td>{new Date(bom.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/boms/${bom.id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No BOMs found.</div>
      )}
      <Link to="/boms/create" className="create-bom-link">Create New BOM</Link>
    </div>
  );
};

export default BOMList;