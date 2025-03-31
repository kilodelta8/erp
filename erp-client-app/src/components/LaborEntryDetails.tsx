import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/LaborEntryDetails.css'; // Import the CSS file

interface LaborEntry {
  id: number;
  employeeName: string;
  project: string;
  task: string;
  hours: number;
  date: string;
}


const LaborEntryDetails: React.FC = () => {
  const { entryId } = useParams();
  const [entry, setEntry] = useState<LaborEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntryDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/labor-entries/${entryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch labor entry details');
        }
        const data: LaborEntry = await response.json();
        setEntry(data);
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

    fetchEntryDetails();
  }, [entryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!entry) {
    return <div>Labor entry not found.</div>;
  }

  return (
    <div className="labor-entry-details-container">
      <h2>Labor Entry Details</h2>
      <div className="entry-info">
        <p><strong>Employee Name:</strong> {entry.employeeName}</p>
        <p><strong>Project:</strong> {entry.project}</p>
        <p><strong>Task:</strong> {entry.task}</p>
        <p><strong>Hours:</strong> {entry.hours}</p>
        <p><strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}</p>
      </div>
      <Link to="/labor-entries" className="back-to-list">
        Back to Labor Entries List
      </Link>
    </div>
  );
};

export default LaborEntryDetails;