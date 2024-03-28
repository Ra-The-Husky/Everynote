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
        <div className="deleteNotebookModal">
            <h1>Delete Notebook</h1>
            <p>Are you sure want to delete {notebookName}?</p>
            <div>
                <button className="logout" onClick={burnNote}> Yes, Burn it! </button>
                <button className="logout"> No, I changed my mind </button>
            </div>
        </div>
    );
}


export default DeleteNotebookModal
