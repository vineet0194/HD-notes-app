import React, { useState, useEffect } from 'react';
import api from '../api/api';
import './Dashboard.css';
import logo from '../assets/logo.png';

interface DashboardProps {
  onLogout: () => void;
}

interface Note {
  _id: string;
  content: string;
  createdAt: string;
}

// Add a type for the user object
interface User {
  name: string;
  email: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both user details and notes
        const userRes = await api.get('/users/me');
        const notesRes = await api.get('/notes');
        setUser(userRes.data);
        setNotes(notesRes.data);
      } catch (err) {
        console.error('Error fetching data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return; // Don't create empty notes

    try {
      // Use our api utility to send the new note to the backend
      const res = await api.post('/notes', { content });
      
      // Add the new note to the top of the notes list in the UI
      setNotes([res.data, ...notes]);
      
      // Clear the textarea
      setContent('');
    } catch (err) {
      console.error('Error creating note', err);
    }
  };

  const handleDeleteNote = async (id: string) => {
    // Optional: ask for confirmation before deleting
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      // Use our api utility to send a delete request to the backend
      await api.delete(`/notes/${id}`);
      
      // Update the UI by filtering out the deleted note
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error('Error deleting note', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
          {/* 2. Replace the SVG with an img tag */}
          <img src={logo} alt="HD Logo" width="24" height="24" />
          <span>Dashboard</span>
        </div>
        <button onClick={onLogout} className="sign-out-btn">Sign Out</button>
      </header>
      
      <div className="welcome-card">
        <h1>Welcome, {user?.name}!</h1>
        <p>Email: {user?.email}</p>
      </div>
      
      {/* For simplicity, we'll keep the create form visible */}
      {/* A more advanced implementation might use a modal */}
      <form onSubmit={handleCreateNote}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Create a new note..." // Updated placeholder
          required
        />
        <button type="submit" className="create-note-btn">Create Note</button>
      </form>

      <div className="notes-list">
        <h2>Notes</h2>
        {notes.length === 0 ? (
          <p>You have no notes yet.</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="note-item">
              <p>{note.content}</p>
              <button onClick={() => handleDeleteNote(note._id)} className="delete-btn">
                {/* Trash icon SVG */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;