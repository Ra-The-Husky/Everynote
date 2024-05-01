import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editNotebookThunk } from "../../redux/notebooks";
import { useModal } from "../../context/Modal";

function EditNotebookModal({ notebook }) {

  const { closeModal } = useModal();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState(notebook.name);
  const [description, setDescription] = useState(notebook.description);

  const submitNotebook = async (e) => {
    e.preventDefault();
    const editedNotebook = {
      name,
      description,
    };

    dispatch(editNotebookThunk(notebook.id, editedNotebook)).then(() => {
      closeModal();
      navigate(`/notebooks`);
    });
  };

  return (
    <div className="editNotebookModal">
      <img className="create-notebook-img" src="https://res.cloudinary.com/dfxxgifho/image/upload/v1710376011/EveryNote_iw1qhe.png" />
      <h1>Edit {name&&name}</h1>
      <form className="editNotebookForm" onSubmit={submitNotebook}>
          <input
          className="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value.replace(/ +(?= )/g, ""))}
          ></input>
          <textarea
          className="new-notebook-info edit-notebook-info"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value.replace(/ +(?= )/g, ""))}
          ></textarea>
        <div className="buttons">
          <button
            className="edit-notebook-button"
            type="submit"
            disabled={!name || !description}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditNotebookModal;
