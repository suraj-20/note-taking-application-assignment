import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes, onEdit, onDelete }) {
  return (
    <ul className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default NoteList;
