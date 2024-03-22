import express from 'express';
import donationController from '../controllers/donationController';

const router = express.Router();

router.get('/', donationController.getAllDonations);
router.post('/', donationController.createDonation);
router.get('/:id/information', donationController.getDonationInformation);
router.get('/:id/details', donationController.getDonationDetails);
router.put('/:id', donationController.updateDonation);
router.delete('/:id', donationController.deleteDonation);

export default router;
