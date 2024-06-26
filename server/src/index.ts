import express from 'express';
import dotenv from 'dotenv';
import donationRouter from './routes/donationRoutes';
import paymentRouter from './routes/paymentRoutes';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/donations', donationRouter);
app.use('/payments', paymentRouter);

const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

export default app;
