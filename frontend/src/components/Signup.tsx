import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
        </div>
        {/* Add the new birthday input field */}
        <div>
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={birthday}
            onChange={onChange}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <span onClick={onSwitchToLogin} style={{ color: 'blue', cursor: 'pointer' }}>
          Sign In
        </span>
      </p>
    </div>
  );
};

export default Signup;