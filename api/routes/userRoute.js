import express from 'express';
import { deleteUser, updateUser, getUserListing, getUser, saveListing, unsaveListing, checkSavedStatus, getSavedListings } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.post('/save-listing/:listingId', verifyToken, saveListing);
router.delete('/unsave-listing/:listingId', verifyToken, unsaveListing);
router.get('/check-saved/:listingId', verifyToken, checkSavedStatus);
router.get('/saved-listings', verifyToken, getSavedListings);
router.get('/listings/:id', verifyToken, getUserListing);

// Move this route to the end
router.get('/:id', verifyToken, getUser);

export default router;
  
 



