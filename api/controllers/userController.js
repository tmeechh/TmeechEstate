import userModel from "../models/UserModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const updateUser = async (req, res, next) => {
    console.log("req.user:", req.user);
    console.log("req.params.id:", req.params.id);

    
 // Convert both IDs to strings for comparison
 if (!req.user || req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
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
}
