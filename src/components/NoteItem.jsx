import React from "react";

function NoteItem({ note, onEdit, onDelete }) {
  return (
    <li className="note-item">
      <h3>{note.title}</h3>
      <p>{note.content.substring(0, 100)}...</p>
      <small>{note.timestamp}</small>
      <div className="note-actions">
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </li>
  );
}

export default NoteItem;
