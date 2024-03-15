const GET_NOTEBOOK = "home/GetNotebook";

const getNotebook = (notebooks) => ({
  type: GET_NOTEBOOK,
  notebooks,
});

export const notebookThunk = () => async (dispatch) => {
  const response = await fetch("/api/notebooks/");
  if (response.ok) {
    const data = await response.json();
    dispatch(getNotebook(data));
  }
};

const initialState = { notebooks: null };

function notebookReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTEBOOK:
      return { ...state, notebooks: action.notebooks };
    default:
      return state;
  }
}

export default notebookReducer;
