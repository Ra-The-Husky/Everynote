import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editNotebookThunk } from "../../redux/notebooks";
import { useModal } from "../../context/Modal";



function EditNotebookModal({notebook}) {
    console.log(notebook)
    const { closeModal } = useModal();

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState(notebook.name);
    const [description, setDescription] = useState(notebook.description);

    const submitNotebook = async (e) => {
        e.preventDefault();
        const editedNotebook = {
            name,
            description,
        };

        dispatch(editNotebookThunk(notebook.id, editedNotebook)).then(() => {
            closeModal()
            navigate(`/notebooks`)
        })
    };

    return (
        <>
            <h1>Edit Notebook</h1>
            <form onSubmit={submitNotebook}>
                <div className="name">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
                <div className="info">
                    <textarea
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="buttons">
                    <button
                        className="button"
                        type="submit"
                        disabled={!name || !description}
                    >Save</button>
                </div>
            </form>
        </>
    )
}

export default EditNotebookModal
