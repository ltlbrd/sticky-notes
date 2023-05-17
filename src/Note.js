import React from "react";

const Note = (props) => {
  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editNoteId = props.note.id;
    props.onType(editNoteId, "title", updatedValue);
  };

  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editNoteId = props.note.id;
    props.onType(editNoteId, "description", updatedValue);
  };

  const deleteClick = () => {
    props.removeNote(props.note.id);
  };

  return (
    <li className="note">
      <input
        className="note__title"
        type="text"
        placeholder="Title"
        value={props.note.title}
        onChange={updateTitle}
      />
      <textarea
        className="note__description"
        placeholder="Description..."
        value={props.note.description}
        onChange={updateDescription}
      />
      <span className="note__delete" onClick={deleteClick}>
        X
      </span>
    </li>
  );
};

export default Note;
