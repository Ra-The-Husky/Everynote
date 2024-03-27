const GET_TASKS = 'tasks/GetTasks';

const getTasks = (tasks) => ({
  type: GET_TASKS,
  tasks
});

export const tasksThunk = () => async (dispatch) => {
  const response = await fetch("/api/tasks/");
  if (response.ok) {
    const data = await response.json();
    dispatch(getTasks(data));
    return data;
  }
};

export const finishedTaskThunk = (taskId) => async (dispatch) => {
  await fetch(`/api/tasks/complete-task/${taskId}`)
  dispatch(tasksThunk())
}

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
