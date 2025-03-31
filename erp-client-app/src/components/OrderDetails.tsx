import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/OrderDetails.css'; // Import the CSS file

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  orderDate: string;
  items: OrderItem[];
  totalAmount: number;
}

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<Record<string, string | undefined>>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data: Order = await response.json();
        setOrder(data);
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

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>
      <div className="order-info">
        <p><strong>Order Number:</strong> {order.orderNumber}</p>
        <p><strong>Customer ID:</strong> {order.customerId}</p>
        <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
        <h3>Order Items:</h3>
        <table className="order-items-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id}>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
      </div>
      <Link to="/orders" className="back-to-list">
        Back to Orders List
      </Link>
    </div>
  );
};

export default OrderDetails;