import { Router } from 'express';
import { registerUser, verifyOtp, loginUser, getMe } from '../controllers/user.controller';
import auth from '../middleware/auth.middleware'; 


const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser); // Add the new login route
router.post('/verify-otp', verifyOtp);

router.get('/me', auth, getMe);

export default router;