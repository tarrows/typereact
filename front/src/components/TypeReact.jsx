import React, { Component } from 'react';
import { connect } from 'react-redux';

import {notes} from "../actions";

export class TypeReact extends Component {
  state = {
    text: ""
  }

  submitNote = (e) => {
    e.preventDefault();
    this.props.addNote(this.state.text);
    this.setState({text: ""});
  }

  render() {
    return (
      <div>
        <h2>Welcome to TypeReact!</h2>
        <hr />

        <h3>Add new note</h3>
        <form onSubmit={this.submitNote}>
          <input
            value={this.state.text}
            placeholder="Enter note here..."
            onChange={(e) => this.setState({text: e.target.value})}
            required
          />
          <input type="submit" value="Save Note" />
        </form>

        <h3>Notes</h3>
        <table>
          <tbody>
            {this.props.notes.map((note, id) => (
              <tr key={`note_${id}`}>
                <td>{note.text}</td>
                <td><button>edit</button></td>
                <td><button onClick={() => this.props.deleteNote(id)}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    notes: state.notes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNote: (text) => {
      dispatch(notes.addNote(text));
    },
    updateNote: (id, text) => {
      dispatch(notes.updateNote(id, text));
    },
    deleteNote: (id) => {
      dispatch(notes.deleteNote(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeReact);
