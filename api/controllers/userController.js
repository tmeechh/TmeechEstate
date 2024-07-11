import userModel from "../models/UserModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const updateUser = async (req, res, next) => {
    console.log("req.user:", req.user);
    console.log("req.params.id:", req.params.id);

    if (req.user._id.toString() !== req.params.id) {
        return next(errorHandler(401, "You can only update your own account!"));
    }

    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return next(errorHandler(404, "User not found"));
        }

        // Update user fields
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        // Hash new password if provided
        if (req.body.password) {
            user.password = bcryptjs.hashSync(req.body.password, 10);
        }

        // Update avatar if provided
        user.avatar = req.body.avatar || user.avatar;

        // Save updated user
        const updatedUser = await user.save();

        const { password, ...rest } = updatedUser._doc;
        
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}
