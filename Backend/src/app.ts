import express from 'express';
import dotenv from 'dotenv';
import logsRoute from './routes/logsRoute';
import performanceRoute from './routes/performanceRoute';
import employeesRoute from './routes/employees';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/logs', logsRoute);
app.use('/performance', performanceRoute);
app.use('/employees',employeesRoute)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
