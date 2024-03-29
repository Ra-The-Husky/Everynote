import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { destroyNote } from "../../redux/notes";
import { useNavigate } from "react-router-dom";

function DeleteNoteModal({ noteId, notebook }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  
  const burnNote = (e) => {
    e.preventDefault();

    return dispatch(destroyNote(noteId)).then(() => {
      navigate("/notes");
      closeModal();
    });
  };

  return (
    <>
      <h1>Delete Note</h1>
      <p>Are you sure want to delete this note from your "{notebook?.name}" notebook?</p>
      <button onClick={burnNote}>Yes, Burn it!</button>
      <button onClick={() => closeModal()}>No, I changed my mind</button>
    </>
  );
}

export default DeleteNoteModal;
