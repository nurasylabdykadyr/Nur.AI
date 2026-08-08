import pg from 'pg';

export const db = new pg.Pool({
  user: 'postgres',         
  host: 'localhost',
  database: 'nur_ai',     
  password: 'qwer',         
  port: 5432,
});

db.connect((err) => {
  if (err) console.error('Ошибка подключения к PostgreSQL:', err.message);
  else console.log('PostgreSQL успешно подключена!');
});