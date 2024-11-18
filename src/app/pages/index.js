import { useState, useEffect } from 'react';

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch('/api/notes');
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const data = await response.json();
        console.log('Fetched notes:', data);
        setNotes(data);
      } catch (err) {
        console.error('Error fetching notes:', err);
        setError(err.message);
      }
    }
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newNote }),
      });

      if (!response.ok) {
        throw new Error('Failed to add note');
      }

      const addedNote = await response.json();
      console.log('Added note:', addedNote);
      setNotes([addedNote, ...notes]);
      setNewNote('');
    } catch (err) {
      console.error('Error adding note:', err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            {error && (
              <div className="mb-4 p-4 text-red-700 bg-red-100 rounded">
                Error: {error}
              </div>
            )}
            
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Write a note..."
                  className="w-full h-24 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Note
                </button>
              </form>
              
              <div className="pt-6 space-y-4">
                {notes.map((note) => (
                  <div 
                    key={note.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    {note.content}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}