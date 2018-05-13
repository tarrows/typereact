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

export const updateNote = (id, text) => {
  return {
    type: 'UPDATE_NOTE',
    id,
    text
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
