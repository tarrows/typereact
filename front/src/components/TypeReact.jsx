import React, { Component } from 'react';
import { connect } from 'react-redux';

export class TypeReact extends Component {
  render() {
    return (
      <div>
        <h2>Welcome to TypeReact!</h2>
        <hr />

        <h3>Notes</h3>
        <table>
          <body>
            {this.props.notes.map(note => (
              <tr>
                <td>{note.text}</td>
                <td><button>edit</button></td>
                <td><button>delete</button></td>
              </tr>
            ))}
          </body>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeReact);
