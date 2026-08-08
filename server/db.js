import pg from 'pg';
import 'dotenv/config';

const poolConfig = process.env.DATABASE_URL 
  ? { 
      connectionString: process.env.DATABASE_URL, 
      ssl: { rejectUnauthorized: false } 
    }
  : { 
      user: 'postgres', 
      host: 'localhost', 
      database: 'nur_ai', 
      password: 'qwer', 
      port: 5432 
    };

export const db = new pg.Pool(poolConfig);

db.connect((err) => {
    if (err) console.error('Ошибка подключения к PostgreSQL:', err.message);
    else console.log('PostgreSQL успешно подключена!');
});