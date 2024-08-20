import express from 'express';
// import passport from 'passport';

import { signin, signup, google, signOut, forgotPassword, verifyOTP, resetPassword } from '../controllers/authController.js';




const router = express.Router();

router.post("/signup", signup); 
router.post("/signin", signin);
router.post('/google', google)
router.get('/signout', signOut)
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);



// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

// router.get("/facebook/callback", passport.authenticate("facebook", { successRedirect: 'http://localhost:5173/, failureRedirect: "http://localhost:5173/' }));
  
  

  


export default router;