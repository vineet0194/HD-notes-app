import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import logo from '../assets/logo.png';

interface LoginProps {
  onAuthSubmit: (email: string) => void; // Renamed for clarity
  onSwitchToSignup: () => void;
}

// And also receive it here
const Login: React.FC<LoginProps> = ({ onAuthSubmit, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      // Call the new login endpoint
      await axios.post('/api/users/login', { email });
      // On success, switch to the OTP verification view
      onAuthSubmit(email);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Failed to send login code');
    }
  };

// In /frontend/src/components/Login.tsx

  return (
    <div className="auth-container">
      <div className="logo">
        <img src={logo} alt="HD Logo" width="24" height="24" />
        <span>HD</span>
      </div>
      <h2>Sign In</h2>
      <p>Please login to continue to your account.</p>
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Send Login Code</button>
      </form>

      <p className="switch-auth-text">
        Don't have an account?{' '}
        <span onClick={onSwitchToSignup}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;