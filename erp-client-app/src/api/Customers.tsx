/* eslint-disable react-refresh/only-export-components */
import express, { Request, Response, Router } from 'express';
import { Pool, QueryResult } from 'pg';

const router: Router = express.Router();

interface Customer {
  customer_id: number;
  customer_name: string;
  contact_info: string;
}

interface CustomerRequestBody {
  customer_name: string;
  contact_info: string;
}

export default (db: Pool) => {
  // 1. GET /customers: Retrieves a list of all customers.
  router.get('/', async (_req: Request, res: Response): Promise<void> => {
    try {
      const result: QueryResult<Customer> = await db.query(
        'SELECT customer_id, customer_name, contact_info FROM customers'
      );
      res.json(result.rows);
    } catch (err: unknown) {
      console.error('Error fetching customers:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 2. GET /customers/{customer_id}: Retrieves a specific customer by ID.
  router.get('/:customer_id', async (req: Request<{ customer_id: string }>, res: Response): Promise<void> => {
    const { customer_id } = req.params;
    try {
      const result: QueryResult<Customer> = await db.query(
        'SELECT customer_id, customer_name, contact_info FROM customers WHERE customer_id = $1',
        [customer_id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Customer not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Error fetching customer:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 3. POST /customers: Creates a new customer.
  router.post('/', async (req: Request<object, object, CustomerRequestBody>, res: Response): Promise<void> => {
    const { customer_name, contact_info } = req.body;
    if (!customer_name || !contact_info) {
      res.status(400).json({ error: 'Customer name and contact info are required' });
      return;
    }

    try {
      const result: QueryResult<Customer> = await db.query(
        'INSERT INTO customers (customer_name, contact_info) VALUES ($1, $2) RETURNING customer_id, customer_name, contact_info',
        [customer_name, contact_info]
      );
      res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Error creating customer:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 4. PUT /customers/{customer_id}: Updates an existing customer.
  router.put('/:customer_id', async (req: Request<{ customer_id: string }, object, CustomerRequestBody>, res: Response): Promise<void> => {
    const { customer_id } = req.params;
    const { customer_name, contact_info } = req.body;

    try {
      const result: QueryResult<Customer> = await db.query(
        'UPDATE customers SET customer_name = $1, contact_info = $2 WHERE customer_id = $3 RETURNING customer_id, customer_name, contact_info',
        [customer_name, contact_info, customer_id]
      );
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Customer not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Error updating customer:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 5. DELETE /customers/{customer_id}: Deletes a customer.
  router.delete('/:customer_id', async (req: Request<{ customer_id: string }>, res: Response): Promise<void> => {
    const { customer_id } = req.params;

    try {
      const result: QueryResult = await db.query('DELETE FROM customers WHERE customer_id = $1', [customer_id]);
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Customer not found' });
        return;
      }
      res.status(204).send();
    } catch (err: unknown) {
      console.error('Error deleting customer:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  return router;
};