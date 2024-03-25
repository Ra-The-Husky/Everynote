const GET_NOTEBOOKS = "home/GetNotebooks";
const GET_NOTEBOOK = "home/GetNotebook"

const getNotebooks = (notebooks) => ({
  type: GET_NOTEBOOKS,
  notebooks,
});

const getNotebook = (notebook) => ({
  type: GET_NOTEBOOK,
  notebook,
});

export const notebookThunk = () => async (dispatch) => {
  const response = await fetch("/api/notebooks/");
  if (response.ok) {
    const data = await response.json();
    dispatch(getNotebooks(data));
  }
};

export const getNotebookThunk = (notebookId) => async (dispatch) => {
  const response = await fetch(`/api/notebooks/${notebookId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getNotebook(data));
  }
};

export const newNotebookThunk = (notebook) => async (dispatch) => {
  const response = await fetch("/api/notebooks/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notebook),
  })

  if (response.ok) {
    dispatch(notebookThunk())
  }
}

export const editNotebookThunk = (notebookId, notebook) => async (dispatch) => {
  const response = await fetch(`/api/notebooks/${notebookId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notebook),
  });
  if (response.ok) {
    dispatch(notebookThunk());
  }
};

export const destroyNotebook = (notebookId) => async (dispatch) => {
  const response = await fetch(`/api/notebooks/${notebookId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(notebookThunk())
  }
}

const initialState = { notebooks: null };

function notebookReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTEBOOKS:
      return { ...state, notebooks: action.notebooks };
    case GET_NOTEBOOK:
        return { ...state, notebook: action.notebook };
    default:
      return state;
  }
}

export default notebookReducer;
