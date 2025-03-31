import { Pool } from 'pg';

const db = new Pool({
    host: 'localhost',
    user: 'your-username',
    password: 'your-password',
    database: 'your-database',
    port: 5432, // Default PostgreSQL port
});

export default db;