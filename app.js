import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import authRoutes from './src/routes/authRoutes.js';
import snippetsRoutes from './src/routes/snippetsRoutes.js';
import errorHandler from './src/middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// SOLO v1
app.use('/api/v1', authRoutes);
app.use('/api/v1', snippetsRoutes);

// handler al final
app.use(errorHandler);

export default app;