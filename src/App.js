import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [],
    searchText: ""
  };

  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };

    this.setState({ notes: [newNote, ...this.state.notes] });
  };

  onType = (editNoteId, updatedKey, updatedValue) => {
    // editNoteId == ID of note being edited
    // updatedKey == field being edited (title or description)
    // updatedValue == value of field (whether title or desc.)
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editNoteId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({
      notes: updatedNotes,
      searchText: newSearchText
    });
  };

  removeNote = (noteId) => {
    const updatedNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: updatedNotes });
  };

  componentDidUpdate() {
    const stringifyNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifyNotes);
  }

  componentDidMount() {
    const stringifyNotes = localStorage.getItem("savedNotes");
    if (stringifyNotes) {
      const savedNotes = JSON.parse(stringifyNotes);
      this.setState({ notes: savedNotes });
    }
  }

  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearch}
          addNote={this.addNote}
          searchText={this.state.searchText}
        />
        <NotesList
          removeNote={this.removeNote}
          onType={this.onType}
          notes={this.state.notes}
        />
      </div>
    );
  }
}

export default App;
