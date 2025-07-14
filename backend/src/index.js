import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';

// Import routes (to be implemented)
// import userRoutes from './routes/userRoutes.js';
// import categoryRoutes from './routes/categoryRoutes.js';
// import promptRoutes from './routes/promptRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
// app.use('/api/users', userRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/prompts', promptRoutes);

app.get('/', (req, res) => {
  res.send('AI Learning Platform API');
});

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
