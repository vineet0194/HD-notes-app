import { Request, Response } from 'express';
import User from '../models/user.model';
import sendEmail from '../utils/sendEmail';
import jwt from 'jsonwebtoken'; // Make sure jsonwebtoken is imported

export const registerUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Set OTP expiration to 10 minutes from now
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user = new User({
      name,
      email,
      otp,
      otpExpires,
    });

    await user.save();
    
    // Send the OTP email
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