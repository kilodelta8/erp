/* eslint-disable react-refresh/only-export-components */
import express, { Request, Response, Router } from 'express';
import { Pool, QueryResult } from 'pg';
import jwt from 'jsonwebtoken'; // Assuming you need auth

const router: Router = express.Router();

interface Order {
  order_id: number;
  customer_id: number;
  order_date: Date;
  total_amount: number;
}

interface OrderItem {
  order_item_id: number;
  order_id: number;
  item_id: number;
  quantity: number;
  unit_price: number;
}

interface OrderWithItems extends Order {
  items: OrderItem[];
}


// Assuming you have a userOrAdminAuth middleware (adjust as needed)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Replace with your actual secret

const userOrAdminAuth: express.RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { user_id: number; role: string };
    // Adjust logic to include order access if needed
    if (decoded.role !== 'admin' && decoded.user_id !== parseInt(req.params.order_id)) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export default (db: Pool) => {
  // ... (other order routes)

  router.get('/:order_id', userOrAdminAuth, async (req: Request, res: Response): Promise<void> => {
    const { order_id } = req.params;
    try {
      const orderResult: QueryResult<Order> = await db.query(
        'SELECT order_id, customer_id, order_date, total_amount FROM orders WHERE order_id = $1',
        [order_id]
      );

      if (orderResult.rows.length === 0) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }

      const itemsResult: QueryResult<OrderItem> = await db.query(
        'SELECT order_item_id, order_id, item_id, quantity, unit_price FROM order_items WHERE order_id = $1',
        [order_id]
      );

      const orderWithItems: OrderWithItems = {
        ...orderResult.rows[0],
        items: itemsResult.rows,
      };
      res.json(orderWithItems);
    } catch (err: unknown) {
      console.error('Error fetching order:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // ... (other order routes)

  return router;
};