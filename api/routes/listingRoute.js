import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings, getMoreSearch } from '../controllers/listingController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id',  getListing);   //verifyToken 
router.get('/get', getListings)
router.get('/getmoresearch', getMoreSearch )

export default router;