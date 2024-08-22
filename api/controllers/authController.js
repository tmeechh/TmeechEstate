import userModel from '../models/UserModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import emailService from '../utils/mailer.js';
// import passport from 'passport';
// import {Strategy as FacebookStrategy } from 'passport-facebook';  



const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    const user = await userModel.findOne({ email, isDeleted: false });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;  // 5 minutes
    await user.save();

   

    await emailService.sendOTPByEmail(email, user.username, otp); // Use the new service
    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    const user = await userModel.findOne({
      email,
      otp: otp.toString(),
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.status(200).json({ message: 'OTP verified' });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { email, otp, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const user = await userModel.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.password = bcryptjs.hashSync(password, 10);
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid or missing email address' });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new userModel({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

 


export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    const validUser = await userModel.findOne({ email, isDeleted: false });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, 'Wrong credentials!'));
    }
    const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new userModel({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};





export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('Logged out successfully');
  } catch (error) {
    next(error);
  }
};



// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_APP_ID,
//   clientSecret: process.env.FACEBOOK_APP_SECRET,
//   callbackURL: "/auth/facebook/callback",
//   // profileFields: ['id', 'emails', 'name', 'photos']
// },
//   function (accessToken, refreshToken, profile, done)  {
//     done(null, profile);


    
  // console.log(profile);  // Add this line to debug

  // const { emails, first_name, last_name } = profile._json;
  // const email = emails && emails[0] && emails[0].value;
  // const username = `${first_name} ${last_name}`;

  // try {
  //   let user = await userModel.findOne({ email });

  //   if (!user) {
  //     const generatedPassword = Math.random().toString(36).slice(-8);
  //     const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
  //     user = new userModel({
  //       username,
  //       email,
  //       password: hashedPassword,  // Use hashed password
  //       avatar: profile.photos && profile.photos[0] && profile.photos[0].value
  //     });
  //     await user.save();
  //   }

  //   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  //   done(null, { user, token });
  // } catch (error) {
  //   done(error, false);
  // }
// }));


// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

