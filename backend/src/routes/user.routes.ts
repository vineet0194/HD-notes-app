import { Router } from 'express';
import { registerUser, verifyOtp } from '../controllers/user.controller';

const router = Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);

export default router;