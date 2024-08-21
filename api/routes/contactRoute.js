import express from 'express';
import { handleContactMessage, handleContactMessageForSale } from '../controllers/contactController.js'; // Import the controller

const router = express.Router();

router.post('/message', handleContactMessage);
router.post('/listing-inquiry', handleContactMessageForSale);

export default router;
