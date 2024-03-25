import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { destroyNote } from "../../redux/notes";

function DeleteNoteModal({noteId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const burnNote = (e) => {
    e.preventDefault();

    return dispatch(destroyNote(noteId))
    .then(closeModal());
  };

  return (
    <>
      <h1>Delete Note</h1>
      <p>Are you sure want to delete this note from your "note's notebook name will go here" notebook?</p>
      <button onClick={burnNote}>Yes, Burn it!</button>
      <button>No, I changed my mind</button>
    </>
  );
}

export default DeleteNoteModal;
