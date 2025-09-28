import React from 'react';
import './AuthLayout.css'; // We'll create this file next

// This component will wrap our Signup and Login forms
const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="form-container">
        {children}
      </div>
      <div className="image-container">
        {/* The image is set via CSS background */}
      </div>
    </div>
  );
};

export default AuthLayout;