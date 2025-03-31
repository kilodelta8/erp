import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/CustomersList.css'; // Import the CSS file

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const CustomersList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/customers');
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data: Customer[] = await response.json();
        setCustomers(data);
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

    fetchCustomers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="customers-list-container">
      <h2>Customers List</h2>
      {customers.length > 0 ? (
        <table className="customers-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <Link to={`/customers/${customer.id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No customers found.</div>
      )}
      <Link to="/customers/create" className="create-customer-link">Create New Customer</Link>
    </div>
  );
};

export default CustomersList;