import React, { useState } from 'react';
import axios from 'axios'; // Import axios

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

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Send Login Code</button>
      </form>
      <p>Don't have an account?{' '}<span onClick={onSwitchToSignup} style={{ color: 'blue', cursor: 'pointer' }}>Sign Up</span></p>
    </div>
  );
};

export default Login;