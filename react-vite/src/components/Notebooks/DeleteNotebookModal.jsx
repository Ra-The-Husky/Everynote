import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { destroyNotebook } from "../../redux/notebooks";

function DeleteNotebookModal({ notebookId, notebookName }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const burnNote = (e) => {
        e.preventDefault();

        return dispatch(destroyNotebook(notebookId))
            .then(closeModal());
    };

    return (
        <>
            <h1>Delete Notebook</h1>
            <p> Are you sure want to delete {notebookName}</p>
            <button onClick={burnNote}> Yes, Burn it! </button>
            <button> No, I changed my mind </button>
        </>
    );
}


export default DeleteNotebookModal
