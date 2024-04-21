import express from 'express';
import { connectDB } from './config/db.js';
import mapRoutes from './routes/mapRoutes.js';
import userRoutes from './routes/userRoutes.js';
import strategyRoutes from './routes/strategyRoutes.js';

const app = express();

connectDB();

app.use(express.json());

app.use(mapRoutes);
app.use(userRoutes);
app.use(strategyRoutes);

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});