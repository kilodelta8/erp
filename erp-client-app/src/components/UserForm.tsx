import React, { useState } from 'react';
import '../css/UserForm.css'; // Import the CSS file

interface User {
  username: string;
  email: string;
  role: string;
}

const UserForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    username: '',
    email: '',
    role: 'user', // Default role
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      // Handle successful creation (e.g., redirect, show message)
      console.log('User created successfully');
      setUser({ username: '', email: '', role: 'user' });

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="user-form-container">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            {/* Add more roles as needed */}
          </select>
        </div>
        <button type="submit">Create User</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default UserForm;