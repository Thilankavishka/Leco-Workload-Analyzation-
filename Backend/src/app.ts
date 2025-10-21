import express from 'express';
import dotenv from 'dotenv';
import logsRoute from './routes/logsRoute';
import performanceRoute from './routes/performanceRoute';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/logs', logsRoute);
app.use('/api/performance', performanceRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
