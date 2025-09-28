import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png';

interface SignupProps {
  onSignupSuccess: (email: string) => void;
  onSwitchToLogin: () => void; // Add the prop here
}

// And also receive it here
const Signup: React.FC<SignupProps> = ({ onSignupSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthday: '', // Add birthday to the initial state
  });
  const [error, setError] = useState('');

  const { name, email, birthday } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      // Send a POST request to the backend registration endpoint
      const res = await axios.post('/api/users/register', formData);
      console.log(res.data); // Log the success message
      onSignupSuccess(email); // Notify parent component of success
    } catch (err: any) {
      console.error(err.response?.data?.msg || 'An error occurred');
      setError(err.response?.data?.msg || 'Failed to register');
    }
  };

  return (
    <div className="auth-container">
      <div className="logo">
        <img src={logo} alt="HD Logo" width="24" height="24" />
        <span>HD</span>
      </div>
      <h2>Sign up</h2>
      <p>Sign up to enjoy the feature of HD</p>
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthday">Date of Birth</label>
          <input
            id="birthday"
            type="date"
            name="birthday"
            value={birthday}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Get OTP</button>
      </form>

      <p className="switch-auth-text">
        Already have an account?{' '}
        <span onClick={onSwitchToLogin}>
          Sign in
        </span>
      </p>
    </div>
  );
};

export default Signup;