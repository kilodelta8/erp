/* eslint-disable react-refresh/only-export-components */
import express, { Request, Response, Router } from 'express';
import { Pool, QueryResult } from 'pg';

const router: Router = express.Router();

interface InventoryCategory {
  category_id: number;
  category_name: string;
}

interface InventoryCategoryRequestBody {
    category_name: string;
}

export default (db: Pool) => {
  // 1. GET /inventory-categories: Retrieves a list of all inventory categories.
  router.get('/', async (_req: Request, res: Response): Promise<void> => {
    try {
      const result: QueryResult<InventoryCategory> = await db.query(
        'SELECT category_id, category_name FROM inventory_categories'
      );
      res.json(result.rows);
    } catch (err: unknown) {
      console.error('Error fetching inventory categories:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 2. GET /inventory-categories/{category_id}: Retrieves a specific inventory category by ID.
  router.get('/:category_id', async (req: Request<{ category_id: string }>, res: Response): Promise<void> => {
    const { category_id } = req.params;
    try {
      const result: QueryResult<InventoryCategory> = await db.query(
        'SELECT category_id, category_name FROM inventory_categories WHERE category_id = $1',
        [category_id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Error fetching inventory category:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 3. POST /inventory-categories: Creates a new inventory category.
  router.post('/', async (req: Request<object, object, InventoryCategoryRequestBody>, res: Response): Promise<void> => {
    const { category_name } = req.body;
    if (!category_name) {
      res.status(400).json({ error: 'Category name is required' });
      return;
    }

    try {
      const result: QueryResult<InventoryCategory> = await db.query(
        'INSERT INTO inventory_categories (category_name) VALUES ($1) RETURNING category_id, category_name',
        [category_name]
      );
      res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Error creating inventory category:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 4. PUT /inventory-categories/{category_id}: Updates an existing inventory category.
  router.put('/:category_id', async (req: Request<{ category_id: string }, object, InventoryCategoryRequestBody>, res: Response): Promise<void> => {
    const { category_id } = req.params;
    const { category_name } = req.body;

    try {
      const result: QueryResult<InventoryCategory> = await db.query(
        'UPDATE inventory_categories SET category_name = $1 WHERE category_id = $2 RETURNING category_id, category_name',
        [category_name, category_id]
      );
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Error updating inventory category:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 5. DELETE /inventory-categories/{category_id}: Deletes an inventory category.
  router.delete('/:category_id', async (req: Request<{ category_id: string }>, res: Response): Promise<void> => {
    const { category_id } = req.params;

    try {
      const result: QueryResult = await db.query('DELETE FROM inventory_categories WHERE category_id = $1', [category_id]);
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }
      res.status(204).send();
    } catch (err: unknown) {
      console.error('Error deleting inventory category:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  return router;
};