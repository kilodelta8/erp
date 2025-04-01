// server.ts (or index.ts) - Main server file

import express, { NextFunction, Router, Request, Response } from 'express';
import cors from 'cors'; // Ensure @types/cors is installed
import usersRoutes from '../shared/api/Users'; // Adjusted the path to match the correct location
import db from '/Users/john/Dev/erp/erp-client-app/src/db'; // Import the database connection

const port: number = 3000;
const app = express(); // Initialize the app
app.use(cors());
app.use(express.json());
app.use(express.json());

// Use your routes
app.use('/', usersRoutes(db));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

import { Pool, QueryResult } from 'pg'; // Ensure @types/pg is installed

const pool = new Pool({
  host: 'postgres', // Or 'localhost' if running locally
  user: 'postgres', // Or your database user
  password: '', // Or your database password
  database: 'erp_db',
  port: 5432,
}); // Close the Pool configuration object

// Export the pool as a named export instead of default
export { pool }; // Correctly export the pool

import bcrypt from 'bcrypt'; // Ensure @types/bcrypt is installed
import jwt from 'jsonwebtoken';
// Removed duplicate declaration of router

const router: Router = express.Router();

const JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-key'; // Replace with a secure secret

interface User {
  user_id: number;
  username: string;
  role: string;
}

interface UserDetails extends User {
  email: string;
  password: string; // Add the password property to match the database schema
}

// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: { user_id: number; role: string };
    }
  }
}
// Removed duplicate declaration of adminAuth
// Middleware to authenticate and authorize admin users
const adminAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token = (req.headers['authorization'] as string | undefined)?.split(' ')[1];
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
  } catch (err: unknown) {
    console.error('Authentication error:', err);
    res.status(401).json({ error: 'Unauthorized', details: (err as Error).message });
  }
}

// Middleware to authenticate any user, and allow user to access their own info.
const userOrAdminAuth = (req: Request, res: Response, next: NextFunction): void => {
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
  } catch (err: unknown) {
    res.status(401).json({ error: 'Unauthorized', details: (err as Error).message });
  }
}

const createRouter = (db: { default: Pool }) => {
  // 1. GET /users: Retrieves a list of all users (Admin only).
  router.get('/users', adminAuth, async (_req: Request, res: Response): Promise<void> => {
    try {
      const result: QueryResult<User> = await db.default.query('SELECT user_id, username, role FROM users');
      res.json(result.rows);
    } catch (err: unknown) {
      console.error('Get users error:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 2. GET /users/:user_id: Retrieves a specific user by ID (Admin or the user themselves).
  router.get('/users/:user_id', userOrAdminAuth, async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;
    try {
      const result: QueryResult<UserDetails> = await db.default.query(
        'SELECT user_id, username, role, email FROM users WHERE user_id = $1',
        [user_id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Get user by id error:', err);
      res.status(500).json({ error: 'Internal server error', details: (err as Error).message });
    }
  });

  // 3. POST /users: Creates a new user (Admin only).
  router.post('/users', adminAuth, async (req: Request, res: Response): Promise<void> => {
    const { username, password, role, email } = req.body;
    if (!username || !password || !role || !email) {
      res.status(400).json({ error: 'Username, password, role, and email are required' });
      return;
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result: QueryResult<User> = await db.default.query(
        'INSERT INTO users (username, password, role, email) VALUES ($1, $2, $3, $4) RETURNING user_id, username, role',
        [username, hashedPassword, role, email]
      );
      res.status(201).json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Add user error:', err);
      res.status(500).json({ error: 'Internal server error', details: (err as Error).message });
    }
  });

  // 4. PUT /users/:user_id: Updates an existing user (Admin or the user themselves, with limitations).
  router.put('/users/:user_id', userOrAdminAuth, async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;
    const { username, password, role, email } = req.body;

    try {
      let updateQuery = 'UPDATE users SET';
      const updateParams: any[] = [];
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

      const result: QueryResult<UserDetails> = await db.default.query(updateQuery, updateParams);

      if (result.rowCount === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Update user error:', err);
      res.status(500).json({ error: 'Internal server error', details: (err as Error).message });
    }
  });

  // 5. DELETE /users/:user_id: Deletes a user (Admin only).
  router.delete('/users/:user_id', adminAuth, async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;

    try {
      const result: QueryResult = await db.default.query('DELETE FROM users WHERE user_id = $1', [user_id]);
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(204).send();
    } catch (err: unknown) {
      console.error('Delete user error:', err);
      res.status(500).json({ error: 'Internal server error', details: (err as Error).message });
    }
  });

  // 6. POST /login: Authenticates a user and returns a JWT.
  router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' });
    }

    try {
      const result: QueryResult<UserDetails> = await db.default.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );

      if (result.rows.length === 0) {
        res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { user_id: user.user_id, role: user.role },
          JWT_SECRET,
          { expiresIn: '1h' }
        );
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (err: unknown) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Internal Server Error', details: (err as Error).message });
    }
  });

  // 7. GET /me: Retrieves the logged-in user's information.
  router.get('/me', userOrAdminAuth, async (req: Request, res: Response): Promise<void> => {
    try {
      const result: QueryResult<UserDetails> = await db.default.query(
        'SELECT user_id, username, role, email FROM users WHERE user_id = $1',
        [req.user?.user_id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Get me error:', err);
      res.status(500).json({ error: 'Internal server error', details: (err as Error).message });
    }
  });

  // 8. PUT /me: Updates the logged-in user's information.
  router.put('/me', userOrAdminAuth, async (req: Request, res: Response): Promise<void> => {
    const { username, password, email } = req.body;

    try {
      let updateQuery = 'UPDATE users SET';
      const updateParams: any[] = [];
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
      if (email) {
        updateQuery += ` email = $${paramCount++},`;
        updateParams.push(email);
      }

      updateQuery = updateQuery.slice(0, -1); // Remove trailing comma
      updateQuery += ` WHERE user_id = $${paramCount} RETURNING user_id, username, role, email`;
      updateParams.push(req.user?.user_id);

      const result: QueryResult<UserDetails> = await db.default.query(updateQuery, updateParams);

      if (result.rowCount === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(result.rows[0]);
    } catch (err: unknown) {
      console.error('Update me error:', err);
      res.status(500).json({ error: 'Internal server error', details: (err as Error).message });
    }
  });

  return router; // Ensure this is inside the function
}; // Add this closing brace
