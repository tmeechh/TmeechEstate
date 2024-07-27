import express from 'express';
import { signin, signup, google, signOut, forgotPassword, verifyOTP, resetPassword } from '../controllers/authController.js';


const router = express.Router();

router.post("/signup", signup); 
router.post("/signin", signin);
router.post('/google', google)
router.get('/signout', signOut)
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

export default router;