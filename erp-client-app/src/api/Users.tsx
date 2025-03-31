/* eslint-disable react-refresh/only-export-components */
import express, { Request, Response, Router } from 'express';

// Extend the Request interface to include the 'user' property
declare module 'express-serve-static-core' {
  interface Request {
    user?: { user_id: number; role: string };
  }
}
import { Pool, QueryResult } from 'pg';
import bcrypt from 'bcrypt'; // For password hashing
import jwt from 'jsonwebtoken'; // For authentication

const router: Router = express.Router();

interface User {
  user_id: number;
  username: string;
  role: string;
}

interface UserDetails extends User{
    email: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Replace with your actual secret

// Middleware to authenticate and authorize admin users
const adminAuth = (req: Request, res: Response, next: express.NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { user_id: number; role: string };
    if (decoded.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Middleware to authenticate any user, and allow user to access their own info.
const userOrAdminAuth = (req: Request, res: Response, next: express.NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { user_id: number; role: string };
    if (decoded.role !== 'admin' && decoded.user_id !== parseInt(req.params.user_id)) {
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
  // 1. GET /users: Retrieves a list of all users (Admin only).
  router.get('/', adminAuth, async (_: Request, res: Response) => {
    try {
      const result: QueryResult<User> = await db.query('SELECT user_id, username, role FROM users');
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // 2. GET /users/{user_id}: Retrieves a specific user by ID (Admin or the user themselves).
  router.get('/:user_id', userOrAdminAuth, async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;
    try {
      const result: QueryResult<UserDetails> = await db.query('SELECT user_id, username, role, email FROM users WHERE user_id = $1', [user_id]);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // 3. POST /users: Creates a new user (Admin only).
  router.post('/', adminAuth, async (req: Request, res: Response): Promise<void> => {
    const { username, password, role, email } = req.body;
    if (!username || !password || !role || !email) {
      res.status(400).json({ error: 'Username, password, role, and email are required' });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result: QueryResult<User> = await db.query(
        'INSERT INTO users (username, password, role, email) VALUES ($1, $2, $3, $4) RETURNING user_id, username, role',
        [username, hashedPassword, role, email]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // 4. PUT /users/{user_id}: Updates an existing user (Admin or the user themselves, with limitations).
  router.put('/:user_id', userOrAdminAuth, async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;
    const { username, password, role, email } = req.body;

    try {
      let updateQuery = 'UPDATE users SET';
      const updateParams = [];
      let paramCount = 1;

      if (username) {
        updateQuery += ` username = $${paramCount++},`;
        updateParams.push(username);
      }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateQuery += ` password = $${paramCount++},`;
        updateParams.push(hashedPassword);
      }
      if (role) {
        updateQuery += ` role = $${paramCount++},`;
        updateParams.push(role);
      }
      if (email) {
        updateQuery += ` email = $${paramCount++},`;
        updateParams.push(email);
      }

      updateQuery = updateQuery.slice(0, -1); // Remove trailing comma
      updateQuery += ` WHERE user_id = $${paramCount} RETURNING user_id, username, role, email`;
      updateParams.push(user_id);

      const result: QueryResult<UserDetails> = await db.query(updateQuery, updateParams);

      if (result.rowCount === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // 5. DELETE /users/{user_id}: Deletes a user (Admin only).
  router.delete('/:user_id', adminAuth, async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;

    try {
      const result: QueryResult = await db.query('DELETE FROM users WHERE user_id = $1', [user_id]);
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(204).send();
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};