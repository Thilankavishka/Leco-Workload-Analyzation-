import express from 'express';
import cors from 'cors';
import employeesRoute from './routes/employeesRoute';
import logsRoute from './routes/logsRoute';
import performanceRoute from './routes/performanceRoute';

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/employees', employeesRoute);
app.use('/logs', logsRoute);
app.use('/performance', performanceRoute);

app.get('/', (_req, res) => res.send('LECO API Running ✅'));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
