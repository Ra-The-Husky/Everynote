import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newNotebookThunk } from "../../redux/notebooks";
import { useModal } from "../../context/Modal";



function CreateNotebookModal() {
    const { closeModal } = useModal();

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const submitNotebook = async (e) => {
        e.preventDefault();
        const newNotebook = {
            name,
            description,
        };
        dispatch(newNotebookThunk(newNotebook)).then(() => {
            closeModal()
            navigate(`/notebooks`)
        })
    };

    return (
        <div className="createNotebookModal">
            <h1>Create A New Notebook</h1>
            <form className="createNotebookForm" onSubmit={submitNotebook}>
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
                        className="logout"
                        type="submit"
                        disabled={!name || !description}
                    >Save</button>
                </div>
            </form>
        </div>
    )
}

export default CreateNotebookModal
