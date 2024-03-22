import express from 'express';
import donationRouter from './routes/donationRoutes';
import paymentRouter from './routes/paymentRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/donations', donationRouter);
app.use('/payments', paymentRouter);

export default app;
