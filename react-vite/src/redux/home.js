

const GET_NOTES = "home/GetNotes";

const getNotes = (notes) => ({
  type: GET_NOTES,
  notes,
});

export const noteThunk = () => async (dispatch) => {
  const response = await fetch("/api/home");
  console.log(response,"$$$$$$$$$$$$$")
  if (response.ok) {
    const data = await response.json();
    dispatch(getNotes(data));
  }
};

const initialState = { notes: null };

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return { ...state, notes: action.notes };
    default:
      return state;
  }
}

export default notesReducer;
