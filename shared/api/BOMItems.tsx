/* eslint-disable react-refresh/only-export-components */
import express, { Request, Response, Router } from 'express';
import { Pool, QueryResult } from 'pg';

const router: Router = express.Router();

interface BOMItem {
  bom_id: number;
  item_id: number;
  quantity: number;
}

interface BOMItemRequestBody {
  quantity: number;
}

export default (db: Pool) => {
  // 1. GET /bom-items: Retrieves a list of all BOM items.
  router.get('/', async (_req: Request, res: Response): Promise<void> => {
    try {
      const result: QueryResult<BOMItem> = await db.query(
        'SELECT bom_id, item_id, quantity FROM bom_items'
      );
      res.json(result.rows);
    } catch (err: unknown) {
      console.error('Error fetching BOM items:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 2. GET /bom-items/{bom_id}/{item_id}: Retrieves a specific BOM item by BOM ID and Item ID.
  router.get('/:bom_id/:item_id', async (req: Request<{ bom_id: string; item_id: string }>, res: Response): Promise<void> => {
    const { bom_id, item_id } = req.params;
    try {
      const result: QueryResult<BOMItem> = await db.query(
        'SELECT bom_id, item_id, quantity FROM bom_items WHERE bom_id = $1 AND item_id = $2',
        [bom_id, item_id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'BOM item not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Error fetching BOM item:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 3. POST /bom-items: Creates a new BOM item.
  router.post('/', async (req: Request<object, object, BOMItem>, res: Response): Promise<void> => {
    const { bom_id, item_id, quantity } = req.body;
    if (!bom_id || !item_id || quantity === undefined) {
      res.status(400).json({ error: 'BOM ID, Item ID, and quantity are required' });
      return;
    }

    try {
      const result: QueryResult<BOMItem> = await db.query(
        'INSERT INTO bom_items (bom_id, item_id, quantity) VALUES ($1, $2, $3) RETURNING bom_id, item_id, quantity',
        [bom_id, item_id, quantity]
      );
      res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Error creating BOM item:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 4. PUT /bom-items/{bom_id}/{item_id}: Updates an existing BOM item.
  router.put('/:bom_id/:item_id', async (req: Request<{ bom_id: string; item_id: string }, object, BOMItemRequestBody>, res: Response): Promise<void> => {
    const { bom_id, item_id } = req.params;
    const { quantity } = req.body;

    try {
      const result: QueryResult<BOMItem> = await db.query(
        'UPDATE bom_items SET quantity = $1 WHERE bom_id = $2 AND item_id = $3 RETURNING bom_id, item_id, quantity',
        [quantity, bom_id, item_id]
      );
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'BOM item not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Error updating BOM item:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 5. DELETE /bom-items/{bom_id}/{item_id}: Deletes a BOM item.
  router.delete('/:bom_id/:item_id', async (req: Request<{ bom_id: string; item_id: string }>, res: Response): Promise<void> => {
    const { bom_id, item_id } = req.params;

    try {
      const result: QueryResult = await db.query(
        'DELETE FROM bom_items WHERE bom_id = $1 AND item_id = $2',
        [bom_id, item_id]
      );
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'BOM item not found' });
        return;
      }
      res.status(204).send();
    } catch (err: unknown) {
      console.error('Error deleting BOM item:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  return router;
};