import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png';

interface VerifyOTPProps {
  email: string;
  onLoginSuccess: (token: string) => void; // New prop
}

const VerifyOTP: React.FC<VerifyOTPProps> = ({ email, onLoginSuccess }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/users/verify-otp', { email, otp });
      const token = res.data.token;

      // Save the token to localStorage
      localStorage.setItem('token', token);
      
      // Notify the parent App component
      onLoginSuccess(token);

    } catch (err: any) {
      setError(err.response?.data?.msg || 'Failed to verify OTP');
    }
  };
  // ... rest of the component
// In /frontend/src/components/VerifyOTP.tsx

  return (
    <div className="auth-container">
      <div className="logo">
        <img src={logo} alt="HD Logo" width="24" height="24" />
        <span>HD</span>
      </div>
      <h2>Enter OTP</h2>
      <p>A verification code has been sent to {email}</p>
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="otp">OTP</label>
          <input
            id="otp"
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyOTP;