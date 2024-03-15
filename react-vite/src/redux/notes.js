const GET_NOTES = "notes/GetNotes";
const GET_NOTE = "notes/GetNote";
const NEW_NOTE = "notes/NewNote";
const EDIT_NOTE = "notes/EditNote";
const REMOVE_NOTE = "notes/RemoveNote";

const getNotes = (notes) => ({
  type: GET_NOTES,
  notes,
});

const getNote = (noteDetails) => ({
  type: GET_NOTE,
  noteDetails,
});

const newNote = () => ({
  type: NEW_NOTE,
});

const adjustNote = (id) => ({
  type: EDIT_NOTE,
});

export const allNotes = () => async (dispatch) => {
  const response = await fetch("/api/notes");
  if (response.ok) {
    const data = await response.json();
    dispatch(getNotes(data));
  }
};

export const note = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${notesId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getNote(data));
  }
};

const initialState = { notes: null };

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return { ...state, notes: action.notes };
    case GET_NOTE:
      return { ...state, note: action.noteDetails };
    default:
      return state;
  }
}

export default notesReducer;
