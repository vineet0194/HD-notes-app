import { Request, Response } from 'express';
import User from '../models/user.model';
import sendEmail from '../utils/sendEmail';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/auth.middleware';

export const registerUser = async (req: Request, res: Response) => {
  // Destructure birthday from the request body
  const { name, email, birthday } = req.body;

  // Add a quick check to make sure birthday is provided
  if (!birthday) {
    return res.status(400).json({ msg: 'Please enter your birthday' });
  }

  try {
    let user = await User.findOne({ email });

    if (user && !user.otp) {
      return res.status(400).json({ msg: 'User already exists. Please log in.' });
    }

    if (!user) {
      // Add birthday when creating a new user
      user = new User({ name, email, birthday });
    }
    
    // For both new users and existing (but unverified) users,
    // generate and send a new OTP.
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;

    await user.save();
    
    await sendEmail(
      user.email,
      'Verify Your Account',
      `Your One-Time Password (OTP) is: ${otp}`
    );
    
    res.status(201).json({ msg: 'User registered. Please check your email for an OTP.' });

  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists or if OTP is valid
    if (!user || user.otp !== otp) {
      return res.status(400).json({ msg: 'Invalid OTP' });
    }

    // Check if the OTP has expired
    if (user.otpExpires && user.otpExpires < new Date()) {
      return res.status(400).json({ msg: 'OTP has expired' });
    }

    // Clear the OTP fields after successful verification
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Create JWT Payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: '5d' }, // Token expires in 5 days
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


export const loginUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if the user exists and is verified (has no pending OTP)
    if (!user || user.otp) {
      return res.status(400).json({ msg: 'User not found or not verified. Please sign up.' });
    }

    // Generate a new OTP for login
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendEmail(
      user.email,
      'Your Login Code',
      `Your One-Time Password (OTP) for logging in is: ${otp}`
    );

    res.status(200).json({ msg: 'Login OTP sent to your email.' });

  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    // The user's id is attached to the request by the auth middleware
    const user = await User.findById(req.user!.id).select('-otp -otpExpires');
    res.json(user);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};