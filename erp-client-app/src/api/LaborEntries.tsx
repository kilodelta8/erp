import express, { Request, Response, Router, NextFunction } from 'express';
import { Pool, QueryResult } from 'pg';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();

interface LaborEntry {
  entry_id: number;
  user_id: number;
  bom_id: number;
  start_time: Date;
  end_time: Date | null;
  total_hours: number | null;
  date: Date;
  notes: string | null;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware for admin or managerial authentication
const adminOrManagerAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { user_id: number; role: string };
    if (decoded.role !== 'admin' && decoded.role !== 'manager') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Middleware for user or admin/managerial authentication
const userOrAdminManagerAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { user_id: number; role: string };
    if (decoded.role !== 'admin' && decoded.role !== 'manager' && decoded.user_id !== parseInt(req.params.entry_id)) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const createLaborEntriesRouter = (db: Pool) => {
  // 1. GET /labor: Retrieves a list of all labor entries (Admin or Managerial).
  router.get('/', adminOrManagerAuth, async (_req: Request, res: Response) => {
    try {
      const result: QueryResult<LaborEntry> = await db.query(
        'SELECT entry_id, user_id, bom_id, start_time, end_time, total_hours, date, notes FROM labor_entries'
      );
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching labor entries:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // 2. GET /labor/{entry_id}: Retrieves a specific labor entry by ID (Admin, Managerial, or the user themselves).
  router.get('/:entry_id', userOrAdminManagerAuth, async (req: Request, res: Response): Promise<void> => {
    const { entry_id } = req.params;
    try {
      const result: QueryResult<LaborEntry> = await db.query(
        'SELECT entry_id, user_id, bom_id, start_time, end_time, total_hours, date, notes FROM labor_entries WHERE entry_id = $1',
        [entry_id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Labor entry not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error fetching labor entry:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // 3. POST /labor: Creates a new labor entry.
  router.post('/', async (req: Request, res: Response): Promise<void> => {
    const { user_id, bom_id, start_time, end_time, total_hours, date, notes } = req.body;
    if (!user_id || !bom_id || !date) {
      res.status(400).json({ error: 'User ID, BOM ID, and date are required' });
    }

    try {
      const result: QueryResult<LaborEntry> = await db.query(
        'INSERT INTO labor_entries (user_id, bom_id, start_time, end_time, total_hours, date, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING entry_id, user_id, bom_id, start_time, end_time, total_hours, date, notes',
        [user_id, bom_id, start_time, end_time, total_hours, date, notes]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error creating labor entry:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // 4. PUT /labor/{entry_id}: Updates an existing labor entry (Admin, Managerial, or the user themselves, with limitations).
  router.put('/:entry_id', userOrAdminManagerAuth, async (req: Request, res: Response): Promise<void> => {
    const { entry_id } = req.params;
    const { user_id, bom_id, start_time, end_time, total_hours, date, notes } = req.body;

    try {
      let updateQuery = 'UPDATE labor_entries SET';
      const updateParams = [];
      let paramCount = 1;

      if (user_id) {
        updateQuery += ` user_id = $${paramCount++},`;
        updateParams.push(user_id);
      }
      if (bom_id) {
        updateQuery += ` bom_id = $${paramCount++},`;
        updateParams.push(bom_id);
      }
      if (start_time) {
        updateQuery += ` start_time = $${paramCount++},`;
        updateParams.push(start_time);
      }
      if (end_time) {
        updateQuery += ` end_time = $${paramCount++},`;
        updateParams.push(end_time);
      }
      if (total_hours) {
        updateQuery += ` total_hours = $${paramCount++},`;
        updateParams.push(total_hours);
      }
      if (date) {
        updateQuery += ` date = $${paramCount++},`;
        updateParams.push(date);
      }
      if (notes) {
        updateQuery += ` notes = $${paramCount++},`;
        updateParams.push(notes);
      }

      updateQuery = updateQuery.slice(0, -1);
      updateQuery += ` WHERE entry_id = $${paramCount} RETURNING entry_id, user_id, bom_id, start_time, end_time, total_hours, date, notes`;
      updateParams.push(entry_id);

      const result: QueryResult<LaborEntry> = await db.query(updateQuery, updateParams);

      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Labor entry not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error updating labor entry:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // 5. DELETE /labor/{entry_id}: Deletes a labor entry (Admin or Managerial).
  router.delete('/:entry_id', adminOrManagerAuth, async (req: Request, res: Response): Promise<void> => {
    const { entry_id } = req.params;

    try {
      const result: QueryResult = await db.query('DELETE FROM labor_entries WHERE entry_id = $1', [entry_id]);
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Labor entry not found' });
        return;
      }
      res.status(204).send();
    } catch (err) {
      console.error('Error deleting labor entry:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};