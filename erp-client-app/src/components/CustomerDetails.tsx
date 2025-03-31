import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/CustomerDetails.css'; // Import the CSS file

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

interface CustomerDetailsParams {
  [key: string]: string | undefined;
  customerId: string;
}

const CustomerDetails: React.FC = () => {
  const { customerId } = useParams<CustomerDetailsParams>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/customers/${customerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch customer details');
        }
        const data: Customer = await response.json();
        setCustomer(data);
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

    fetchCustomerDetails();
  }, [customerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!customer) {
    return <div>Customer not found.</div>;
  }

  return (
    <div className="customer-details-container">
      <h2>Customer Details</h2>
      <div className="customer-info">
        <p><strong>First Name:</strong> {customer.firstName}</p>
        <p><strong>Last Name:</strong> {customer.lastName}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
        <p><strong>Address:</strong> {customer.address}</p>
      </div>
      <Link to="/customers" className="back-to-list">Back to Customers List</Link>
    </div>
  );
};

export default CustomerDetails;