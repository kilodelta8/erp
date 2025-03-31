import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/LaborEntriesList.css'; // Import the CSS file

interface LaborEntry {
  id: number;
  employeeName: string;
  project: string;
  task: string;
  hours: number;
  date: string;
}

const LaborEntriesList: React.FC = () => {
  const [laborEntries, setLaborEntries] = useState<LaborEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLaborEntries = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/labor-entries');
        if (!response.ok) {
          throw new Error('Failed to fetch labor entries');
        }
        const data: LaborEntry[] = await response.json();
        setLaborEntries(data);
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

    fetchLaborEntries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="labor-entries-list-container">
      <h2>Labor Entries</h2>
      {laborEntries.length > 0 ? (
        <table className="labor-entries-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Project</th>
              <th>Task</th>
              <th>Hours</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {laborEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.employeeName}</td>
                <td>{entry.project}</td>
                <td>{entry.task}</td>
                <td>{entry.hours}</td>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>
                  <Link to={`/labor-entries/${entry.id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No labor entries found.</div>
      )}
      <Link to="/labor-entries/create" className="create-entry-link">
        Create New Entry
      </Link>
    </div>
  );
};

export default LaborEntriesList;