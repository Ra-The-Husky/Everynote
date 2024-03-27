const GET_TASKS = 'tasks/GetTasks';
const NEW_TASKS = 'tasks/NewTasks'

const getTasks = (tasks) => ({
  type: GET_TASKS,
  tasks
});

const newTasks = (task) => ({
  type: NEW_TASKS,
  task,
})

export const tasksThunk = () => async (dispatch) => {
  const response = await fetch("/api/tasks/");
  if (response.ok) {
    const data = await response.json();
    dispatch(getTasks(data));
    return data;
  }
};

export const createTask = (task) => async (dispatch) => {
  const response = await fetch("/api/tasks/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(newTasks(data));
    dispatch(tasksThunk())
    return data;
  }
};

const initialState = { tasks: null };

function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, tasks: action.tasks };
    default:
      return state;
  }
}

export default tasksReducer;
