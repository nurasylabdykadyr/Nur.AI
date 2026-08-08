import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/api', apiRoutes);


app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
