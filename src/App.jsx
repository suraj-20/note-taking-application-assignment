import React, { useState, useEffect } from "react";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import Modal from "./components/Modal";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const notesPerPage = 10;

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const loadNotes = () => {
      const storedNotes = localStorage.getItem("notes");
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    };

    loadNotes();
  }, []);

  // Save notes to localStorage whenever the notes state changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addOrUpdateNote = (note) => {
    if (note.id) {
      setNotes(
        notes.map((n) =>
          n.id === note.id
            ? { ...note, timestamp: new Date().toLocaleString() + " (edited)" }
            : n
        )
      );
    } else {
      const newNote = {
        ...note,
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
      };
      setNotes([newNote, ...notes]);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  return (
    <div className="App">
      <h1>Simple Note Taking App</h1>

      <div className="controls">
        <SearchBar onSearch={handleSearch} />
        <button
          style={{ height: "40px", width: "150px"}}
          onClick={() => {
            setCurrentNote(null);
            setIsModalOpen(true);
          }}
        >
          Add New Note
        </button>
      </div>

      <NoteList
        notes={currentNotes}
        onEdit={(note) => {
          setCurrentNote(note);
          setIsModalOpen(true);
        }}
        onDelete={deleteNote}
      />

      <Pagination
        notesPerPage={notesPerPage}
        totalNotes={filteredNotes.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm
          note={currentNote}
          onSave={addOrUpdateNote}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;
