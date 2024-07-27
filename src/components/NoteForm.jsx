import React, { useState } from "react";

function NoteForm({ note, onSave, onClose }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: note?.id, title, content });
    onClose();
  };

  return (
    <form className="notes-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note Content"
        required
      />
      <button type="submit">{note ? "Update Note" : "Add Note"}</button>
    </form>
  );
}

export default NoteForm;
