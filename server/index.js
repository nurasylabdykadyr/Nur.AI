import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());


app.use('/api', apiRoutes);

db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`).then(() => console.log("Таблица users проверена/создана")).catch(err => console.error(err));



app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
