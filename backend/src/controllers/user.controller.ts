import { Request, Response } from 'express';
import User from '../models/user.model';
import sendEmail from '../utils/sendEmail';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/auth.middleware';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, birthday } = req.body;

  if (!birthday) {
    return res.status(400).json({ msg: 'Please enter your birthday' });
  }

  try {
    let user = await User.findOne({ email });

    if (user && !user.otp) {
      return res.status(400).json({ msg: 'User already exists. Please log in.' });
    }

    if (!user) {
      user = new User({ name, email, birthday });
    }

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
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ msg: 'Invalid OTP' });
    }

    if (user.otpExpires && user.otpExpires < new Date()) {
      return res.status(400).json({ msg: 'OTP has expired' });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: '5d' },
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

    if (!user || user.otp) {
      return res.status(400).json({ msg: 'User not found or not verified. Please sign up.' });
    }

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
    const user = await User.findById(req.user!.id).select('-otp -otpExpires');
    res.json(user);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};