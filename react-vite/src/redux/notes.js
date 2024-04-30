const ALL_NOTES = "notes/AllNotes";
const GET_NOTE = "notes/GetNote";
const GET_TAGS = "notes/GetTags";
const NEW_NOTE = "notes/NewNote";
const EDIT_NOTE = "notes/EditNote";
const REMOVE_NOTE = "notes/RemoveNote";
const ADD_TAGS = "notes/AddTags";
const REMOVE_TAG = "notes/RemoveTag";
const GET_NOTEBOOK = 'notes/GetNotebook'

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

const adjustNote = (note) => ({
  type: EDIT_NOTE,
  note,
});

const deleteNote = (noteId) => ({
  type: REMOVE_NOTE,
  noteId,
});

const addTags = (tag) => ({
  type: ADD_TAGS,
  tag,
});

const deleteTag = (tagId) => ({
  type: REMOVE_TAG,
  tagId,
});

const getNotebook = (notebook) => ({
  type: GET_NOTEBOOK,
  notebook
})

export const allNotes = () => async (dispatch) => {
  const response = await fetch("/api/notes");
  if (response.ok) {
    const data = await response.json();
    dispatch(getNotes(data));
  }
};

export const noteInfo = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`);
  const data = await response.json();
  if (response.ok) {
    dispatch(getNote(data.note));
    dispatch(getTags(data.tags));
    dispatch(getNotebook(data.notebook))
    return data;
  } else {
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
    dispatch(newNote(data.note));
    return data;
  }
};

export const editNote = (noteId, edits) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(edits),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(getNote(data));
    dispatch(adjustNote(data));
    return data;
  } else {
    return data
  }
};

export const destroyNote = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(deleteNote(data));
    dispatch(allNotes());
    return data;
  } else {
    return data
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
    dispatch(addTags(data));
    return data;
  }
};

export const destroyTag = (noteId, tagId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}/tags/${tagId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteTag(data));
    dispatch(noteInfo(noteId));
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
    case GET_NOTEBOOK:
      return { ...state, noteNotebook: action.notebook}
    default:
      return state;
  }
}

export default notesReducer;
