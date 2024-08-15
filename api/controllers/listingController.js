import Listing from "../models/ListModel.js";
import { errorHandler } from "../utils/error.js";
import mongoose from 'mongoose';

export const createListing = async (req, res, next) => {
  try {
    const createData = { ...req.body };

    if (createData.priceUponRequest) {
      createData.regularPrice = null;
      createData.discountPrice = null;
    }




      const listing = await Listing.create(req.body);
      return res.status(201).json(listing);
  } catch (error) {
    next(error) 
  }
};


// const updateListingsWithMissingPropertyId = async () => {
//   try {
//     const listings = await Listing.find({ propertyId: { $exists: false } });

//     for (const listing of listings) {
//       listing.propertyId = Math.random().toString(36).substring(2, 7).toUpperCase();
//       await listing.save();
//       console.log(`Updated listing ${listing._id} with propertyId ${listing.propertyId}`);
//     }

//     console.log('Update complete.');
//   } catch (error) {
//     console.error('Error updating listings:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// };

// updateListingsWithMissingPropertyId();

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!Listing) {
    return next(errorHandler(404, "Listing not found"));
  }

  if (req.user.id !== listing.userRef.toString()) {
    return next(errorHandler(401, "You can only delete your own listing"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted");
  } catch (error) {
    next(error);
  }
    
};


export const updateListing = async (req, res, next) => {
  // Validate the ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(errorHandler(400, 'Listing not found'));
  }

  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }

    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You can only update your own listing'));
    }

    const updateData = { ...req.body };

    if (updateData.priceUponRequest) {
      updateData.regularPrice = null;
      updateData.discountPrice = null;
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
}

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    // Handle offer filter
    let offer = req.query.offer === 'true' ? true : undefined;

    // Handle furnished filter
    let furnished = req.query.furnished === 'true' ? true : undefined;

    // Handle parking filter
    let parking = req.query.parking === 'true' ? true : undefined;

    // Handle type filter
    let typeFilter = req.query.type === 'all' ? undefined : req.query.type;

    const searchTerm = req.query.searchTerm || '';
    const searchRegex = new RegExp(searchTerm, 'i');

    let sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const filterConditions = {
      $and: [
        {
          $or: [
            { name: { $regex: searchRegex } },
            { address: { $regex: searchRegex } },
          ],
        },
        offer !== undefined ? { offer } : {},
        furnished !== undefined ? { furnished } : {},
        parking !== undefined ? { parking } : {},
        typeFilter !== undefined ? { type: typeFilter } : {},
      ],
    };

    let listings;

    if (sort === 'random') {
      listings = await Listing.aggregate([
        { $match: filterConditions },
        { $sample: { size: limit + startIndex } },
      ]);
      listings = listings.slice(startIndex, startIndex + limit);
    } else {
      listings = await Listing.find(filterConditions)
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
    }

    return res.status(200).json(listings);

  } catch (error) {
    next(error);
  }
};






export const getMoreSearch = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9; // Default limit to 9

    const listings = await Listing.aggregate([
      { $sample: { size: limit } } // Get 'limit' number of random listings
    ]);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
