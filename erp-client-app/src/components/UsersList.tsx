import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/UsersList.css'; // Import the CSS file

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data: User[] = await response.json();
        setUsers(data);
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

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="users-list-container">
      <h2>Users List</h2>
      {users.length > 0 ? (
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/users/${user.id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No users found.</div>
      )}
      <Link to="/users/create" className="create-user-link">
        Create New User
      </Link>
    </div>
  );
};

export default UsersList;