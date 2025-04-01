import { Pool } from 'pg';

const pool = new Pool({
    host: 'postgres',
    user: 'localhost',
    password: '',
    database: 'erp_db',
    port: 5432, // Default PostgreSQL port
});

export default pool;