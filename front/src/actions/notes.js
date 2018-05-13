export const addNote = text => {
  return dispatch => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({text, });
    return fetch("/api/notes/", {headers, method: "POST", body})
      .then(res => res.json())
      .then(note => {
        return dispatch({
          type: 'ADD_NOTE',
          note
        })
      })
  }
}

export const updateNote = (index, text) => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({text, });
    let noteId = getState().notes[index].id;

    return fetch(`/api/notes/${noteId}/`, {headers, method: "PUT", body})
      .then(res => res.json())
      .then(note => {
        return dispatch({
          type: 'UPDATE_NOTE',
          note,
          index
        })
      })
  }
}

export const deleteNote = id => {
  return {
    type: 'DELETE_NOTE',
    id
  }
}

export const fetchNotes = () => {
  return dispatch => {
    let headers = {"Content-Type": "application/json"};
    return fetch("/api/notes/", {headers, })
      .then(res => res.json())
      .then(notes => {
        console.log(notes);
        return dispatch({
          type: 'FETCH_NOTES',
          notes
        })
      })
  }
}
