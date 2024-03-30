const GET_NOTES = "home/GetNotes";
const GET_NOTEBOOK = "home/GetNotebook";
const GET_TASKS = "home/GetTasks"

const getNotes = (notes) => ({
  type: GET_NOTES,
  notes,
});

const getNotebook = (notebook) => ({
  type: GET_NOTEBOOK,
  notebook,
});

const getTasks= (tasks) => ({
  type: GET_TASKS,
  tasks,
});



export const homeThunk = () => async (dispatch) => {
  const response = await fetch("/api/home");
  if (response.ok) {
    const data = await response.json();
    dispatch(getNotes(data.notes.reverse()));
    dispatch(getNotebook(data.notebooks));
    dispatch(getTasks(data.tasks))
  }
};

const initialState = { notes: null, notebook: null, tasks:null };

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return { ...state, notes: action.notes };
    case GET_NOTEBOOK:
      return { ...state, notebook: action.notebook };
    case GET_TASKS:
      return { ...state, tasks: action.tasks};
    default:
      return state;
  }
}

export default homeReducer;
