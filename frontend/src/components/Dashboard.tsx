import React, { useState, useEffect } from 'react';
import api from '../api/api'; // Import our new api utility

interface DashboardProps {
  onLogout: () => void;
}

// Define a type for our note objects
interface Note {
  _id: string;
  content: string;
  createdAt: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch notes when the component loads
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        setNotes(res.data);
      } catch (err) {
        console.error('Error fetching notes', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
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
    <div>
      <h1>Your Notes</h1>
      <button onClick={onLogout}>Logout</button>

      {/* This form should always be visible */}
      <form onSubmit={handleCreateNote}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          required
        />
        <button type="submit">Create Note</button>
      </form>

      {/* This is the section for displaying the notes list */}
      <div>
        {notes.length === 0 ? (
          <p>You have no notes yet.</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <p>{note.content}</p>
              <small>Created on: {new Date(note.createdAt).toLocaleDateString()}</small>
              <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;