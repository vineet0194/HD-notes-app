import React, { useState } from 'react';
import axios from 'axios';

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
  return (
    <div>
      <h2>Verify Your Account</h2>
      <p>An OTP has been sent to {email}</p>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" placeholder="Enter OTP" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyOTP;