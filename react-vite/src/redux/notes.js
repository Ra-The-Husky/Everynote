const ALL_NOTES = "notes/AllNotes";
const GET_NOTE = "notes/GetNote";
const GET_TAGS = "notes/GetTags";
const NEW_NOTE = "notes/NewNote";
const ADD_TAGS = "notes/AddTags";
const EDIT_NOTE = "notes/EditNote";
const REMOVE_NOTE = "notes/RemoveNote";

const getNotes = (notes) => ({
  type: ALL_NOTES,
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

const newNote = (note) => ({
  type: NEW_NOTE,
  note,
});

const addTags = (tag) => ({
  type: ADD_TAGS,
  tag,
});

const adjustNote = (note) => ({
  type: EDIT_NOTE,
  note,
});

const deleteNote = (noteId) => ({
  type: REMOVE_NOTE,
  noteId
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
    dispatch(getNote(data.note));
    dispatch(getTags(data.tags));
    return data
  }
};

export const createNote = (note) => async (dispatch) => {
  const response = await fetch("/api/notes/new-note", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(newNote(data));
    return data;
  }
};

export const editNote = (noteId, edits) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(edits),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getNote(data))
    dispatch(adjustNote(data));
    return data;
  }
};

export const destroyNote = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteNote(data));
    dispatch(allNotes())
    return data;
  }
};

export const newTags = (noteId, tag) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/tags`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tag),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data, "------------TAG THUNK DATA");
      dispatch(addTags(data));
      return data;
    }
};

const initialState = { notes: null, tags: null };

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_NOTES:
      return { ...state, allNotes: action.notes };
    case GET_NOTE:
      return { ...state, note: action.note };
    case GET_TAGS:
      return { ...state, tags: [action.tags] };
    case NEW_NOTE:
      return { ...state, note: action.newNote };
    case EDIT_NOTE:
      return { ...state, note: action.note };
    case ADD_TAGS:
      return { ...state, tags: action.tags };
    default:
      return state;
  }
}

export default notesReducer;
