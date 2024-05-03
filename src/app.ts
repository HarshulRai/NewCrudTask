import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';
import serviceRoutes from './routes/serviceRoutes';


const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/category', serviceRoutes);

export default app;
