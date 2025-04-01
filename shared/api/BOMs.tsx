/* eslint-disable react-refresh/only-export-components */
import express, { Request, Response, Router } from 'express';
import { Pool, QueryResult } from 'pg';

const router: Router = express.Router();

interface BOM {
  bom_id: number;
  bom_name: string;
  description: string | null;
}

interface BOMItem {
  item_id: number;
  quantity: number;
}

interface BOMWithItems extends BOM {
  items: BOMItem[];
}

interface BOMRequestBody {
    bom_name: string;
    description: string | null;
}

export default (db: Pool) => {
  // 1. GET /boms: Retrieves a list of all BOMs.
  router.get('/', async (_req: Request, res: Response): Promise<void> => {
    try {
      const result: QueryResult<BOM> = await db.query('SELECT bom_id, bom_name, description FROM boms');
      res.json(result.rows);
    } catch (err: unknown) {
      console.error('Error fetching BOMs:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 2. GET /boms/{bom_id}: Retrieves a specific BOM by ID, including its items.
  router.get('/:bom_id', async (req: Request<{ bom_id: string }>, res: Response): Promise<void> => {
    const { bom_id } = req.params;
    try {
      const bomResult: QueryResult<BOM> = await db.query('SELECT bom_id, bom_name, description FROM boms WHERE bom_id = $1', [bom_id]);
      if (bomResult.rows.length === 0) {
        res.status(404).json({ error: 'BOM not found' });
        return;
      }

      const itemResult: QueryResult<BOMItem> = await db.query('SELECT item_id, quantity FROM bom_items WHERE bom_id = $1', [bom_id]);

      const bomWithItems: BOMWithItems = { ...bomResult.rows[0], items: itemResult.rows };
      res.json(bomWithItems);
    } catch (err: unknown) {
      console.error('Error fetching BOM:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 3. POST /boms: Creates a new BOM.
  router.post('/', async (req: Request<object, object, BOMRequestBody>, res: Response): Promise<void> => {
    const { bom_name, description } = req.body;
    if (!bom_name) {
      res.status(400).json({ error: 'BOM name is required' });
      return;
    }

    try {
      const result: QueryResult<BOM> = await db.query(
        'INSERT INTO boms (bom_name, description) VALUES ($1, $2) RETURNING bom_id, bom_name, description',
        [bom_name, description]
      );
      res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Error creating BOM:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 4. PUT /boms/{bom_id}: Updates an existing BOM.
  router.put('/:bom_id', async (req: Request<{ bom_id: string }, object, BOMRequestBody>, res: Response): Promise<void> => {
    const { bom_id } = req.params;
    const { bom_name, description } = req.body;

    try {
      const result: QueryResult<BOM> = await db.query(
        'UPDATE boms SET bom_name = $1, description = $2 WHERE bom_id = $3 RETURNING bom_id, bom_name, description',
        [bom_name, description, bom_id]
      );
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'BOM not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Error updating BOM:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 5. DELETE /boms/{bom_id}: Deletes a BOM.
  router.delete('/:bom_id', async (req: Request<{ bom_id: string }>, res: Response): Promise<void> => {
    const { bom_id } = req.params;

    try {
      const result: QueryResult = await db.query('DELETE FROM boms WHERE bom_id = $1', [bom_id]);
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'BOM not found' });
        return;
      }
      res.status(204).send();
    } catch (err: unknown) {
      console.error('Error deleting BOM:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  return router;
};