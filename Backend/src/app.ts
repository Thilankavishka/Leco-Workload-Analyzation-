// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import logsRouter from './routes/logsRoute';

dotenv.config();

const app = express();
app.use(express.json());

// Logs routes
app.use('/logs', logsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
