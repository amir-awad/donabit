import express from 'express';
import paymentController from '../controllers/paymentController';

const router = express.Router();

router.get('/:donationId', paymentController.getPaymentDetails);
router.post('/:donationId', paymentController.createPayment);
router.put('/:paymentId', paymentController.updatePayment);
router.delete('/:paymentId', paymentController.deletePayment);

export default router;
