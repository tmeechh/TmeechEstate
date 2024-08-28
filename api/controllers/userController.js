import Listing from '../models/ListModel.js';
import userModel from '../models/UserModel.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import validator from 'validator';

export const updateUser = async (req, res, next) => {
  console.log('req.user:', req.user);
  console.log('req.params.id:', req.params.id);

  // Convert both IDs to strings for comparison
  if (!req.user || req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only update your own account!'));
  }

  if (req.body.email && !validator.isEmail(req.body.email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    // Check if the user is trying to delete their own account
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can only delete your own account!'));
    }

    // Find the user by ID first
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return next(errorHandler(404, 'User not found!'));
    }

    // Soft delete the user
    user.isDeleted = true;
    await user.save();
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id }).sort({
        createdAt: -1,
      });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listing!'));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) return next(errorHandler(404, 'User not found'));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


export const saveListing = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return next(errorHandler(404, 'User not found'));

    // Check if the listing is already saved
    if (user.savedListings.includes(req.params.listingId)) {
      return res.status(400).json({ message: 'Listing already saved' });
    }

    user.savedListings.push(req.params.listingId);
    await user.save();

    res.status(200).json({ message: 'Listing saved successfully' });
  } catch (error) {
    next(error);
  }
};

export const unsaveListing = async (req, res, next) => {
  console.log('Unsave request received for listingId:', req.params.listingId);
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return next(errorHandler(404, 'User not found'));

    user.savedListings = user.savedListings.filter(
      (id) => id.toString() !== req.params.listingId
    );
    await user.save();

    res.status(200).json({ message: 'Listing removed from saved listings' });
  } catch (error) {
    console.error('Error in unsaveListing:', error);
    next(error);
  }
};


export const checkSavedStatus = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return next(errorHandler(404, 'User not found'));

    const isSaved = user.savedListings.includes(req.params.listingId);
    res.status(200).json({ isSaved });
  } catch (error) {
    next(error);
  }
}; 
 
// Fetch saved listings for the current user



export const getSavedListings = async (req, res, next) => { 
  try {
    const user = await userModel.findById(req.user.id).populate('savedListings');

    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    res.status(200).json(user.savedListings);
  } catch (error) {
    console.error('Error fetching saved listings:', error); // Log the error
    next(errorHandler(500, 'Internal Server Error'));
  }
};






