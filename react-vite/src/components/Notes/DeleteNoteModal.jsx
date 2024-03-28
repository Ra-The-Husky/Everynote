import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { destroyNote } from "../../redux/notes";
import { useNavigate } from "react-router-dom";


function DeleteNoteModal({noteId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { closeModal } = useModal();

  const burnNote = (e) => {
    e.preventDefault();

    return dispatch(destroyNote(noteId))
    .then(() => {
      navigate('/notes')
      closeModal()
    })
  };

  return (
    <div className="deleteNoteModal">
      <h1>Delete Note</h1>
      <p>Are you sure want to delete this note from your "note's notebook name will go here" notebook?</p>
      <div>
        <button className="logout" onClick={burnNote}>Yes, Burn it!</button>
        <button className="logout">No, I changed my mind</button>
      </div>
    </div>
  );
}

export default DeleteNoteModal;
