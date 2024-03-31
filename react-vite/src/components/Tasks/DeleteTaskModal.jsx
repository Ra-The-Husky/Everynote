import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { destroyTask } from "../../redux/tasks";

function DeleteTaskModal({ task }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const burnTask = (e) => {
        e.preventDefault();

        return dispatch(destroyTask(task?.id))
            .then(closeModal());
    };


    return (
        <div className="deleteNotebookModal">
            <h1>Delete Notebook</h1>
            <p>Are you sure want to delete {task?.name}?</p>
            <div>
                <button className="logout" onClick={burnTask}> Yes, Burn it! </button>
                <button className="logout" onClick={() => {closeModal()}}> No, I changed my mind </button>
            </div>
        </div>
    );
}


export default DeleteTaskModal
