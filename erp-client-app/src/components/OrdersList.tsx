import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/OrdersList.css'; // Import the CSS file

interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  orderDate: string;
  totalAmount: number;
}

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data: Order[] = await response.json();
        setOrders(data);
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

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="orders-list-container">
      <h2>Orders List</h2>
      {orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Customer ID</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.customerId}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td>
                  <Link to={`/orders/${order.id}`}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No orders found.</div>
      )}
      <Link to="/orders/create" className="create-order-link">
        Create New Order
      </Link>
    </div>
  );
};

export default OrdersList;