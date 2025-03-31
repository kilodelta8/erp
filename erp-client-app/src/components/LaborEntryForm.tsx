import React, { useState } from 'react';
import '../css/LaborEntryForm.css'; // Import the CSS file

interface LaborEntry {
  employeeName: string;
  project: string;
  task: string;
  hours: number;
  date: string;
}

const LaborEntryForm: React.FC = () => {
  const [entry, setEntry] = useState<LaborEntry>({
    employeeName: '',
    project: '',
    task: '',
    hours: 0,
    date: new Date().toISOString().slice(0, 10), // Default to today's date
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/labor-entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        throw new Error('Failed to create labor entry');
      }

      // Handle successful creation (e.g., redirect, show message)
      console.log('Labor entry created successfully');
      setEntry({ employeeName: '', project: '', task: '', hours: 0, date: new Date().toISOString().slice(0, 10) });

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="labor-entry-form-container">
      <h2>Create New Labor Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employeeName">Employee Name:</label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            value={entry.employeeName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="project">Project:</label>
          <input
            type="text"
            id="project"
            name="project"
            value={entry.project}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="task">Task:</label>
          <input
            type="text"
            id="task"
            name="task"
            value={entry.task}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hours">Hours:</label>
          <input
            type="number"
            id="hours"
            name="hours"
            value={entry.hours}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={entry.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Entry</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default LaborEntryForm;