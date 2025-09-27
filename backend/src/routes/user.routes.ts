import { Router } from 'express';
import { registerUser, verifyOtp, loginUser } from '../controllers/user.controller';


const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser); // Add the new login route
router.post('/verify-otp', verifyOtp);

export default router;