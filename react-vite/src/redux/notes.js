const GET_NOTES = "notes/GetNotes";
const GET_NOTE = "notes/GetNote";
const GET_TAGS = "notes/GetTags";
const NEW_NOTE = "notes/NewNote";
const EDIT_NOTE = "notes/EditNote";
const REMOVE_NOTE = "notes/RemoveNote";

const getNotes = (notes) => ({
  type: GET_NOTES,
  notes,
});

const getNote = (note) => ({
  type: GET_NOTE,
  note,
});

const getTags = (tags) => ({
  type: GET_TAGS,
  tags,
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

export const noteInfo = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`);
  if (response.ok) {
    const data = await response.json();
    console.log(data, "#$#$#");
    dispatch(getNote(data.note));
    // dispatch(getNotebok(data.notebook))
    dispatch(getTags(data.tags));
  }
};

const initialState = { notes: null, tags: null };

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return { ...state, notes: action.notes };
    case GET_NOTE:
      return { ...state, note: action.note };
    case GET_TAGS:
      return { ...state, tags: [action.tags] };
    default:
      return state;
  }
}

export default notesReducer;
