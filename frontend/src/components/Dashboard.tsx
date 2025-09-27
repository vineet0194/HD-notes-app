import React from 'react';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <div>
      <h1>Welcome to Your Notes</h1>
      <p>Here you can create and manage your notes.</p>
      {/* We will add the note functionality here later */}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;