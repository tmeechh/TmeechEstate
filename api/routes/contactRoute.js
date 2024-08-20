import express from 'express';
import { handleContactMessage } from '../controllers/contactController.js'; // Import the controller

const router = express.Router();

router.post('/message', handleContactMessage); // Use the controller function

export default router;
