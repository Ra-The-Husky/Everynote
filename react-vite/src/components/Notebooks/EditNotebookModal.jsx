import { useState, useEffect } from "react";
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const errs = {};

    if (!name.length) {
      errs.name = "Name of Notebook required";
    }
    if (name?.trim().length < 1) {
      return;
    }
    if (description.length < 20) {
      errs.description = "Description must be a minimum of 20 characters";
    }
    if (description?.trim().length < 1) {
      return;
    }
    setErrors(errs);
  }, [name, description]);

  const submitNotebook = async (e) => {
    e.preventDefault();

    const errs = {};
    if (!name) {
      errs.name = "Name of Notebook required";
    }
    if (name?.trim().length < 1) {
      return;
    }
    if (description.length < 20) {
      errs.description = "Description must be a minimum of 20 characters";
    }
    if (description?.trim().length < 1) {
      errs.description = "Description Required";
      return;
    }
// setErrors(errs);

    const editedNotebook = {
      name,
      description,
    };

    if (Object.values(errors).length) {
      return errors;
    } else {
      dispatch(editNotebookThunk(notebook.id, editedNotebook)).then(() => {
        closeModal();
        navigate(`/notebooks`);
      });
    }
  };

  return (
    <div className="editNotebookModal">
      <img
        className="create-notebook-img"
        src="https://res.cloudinary.com/dfxxgifho/image/upload/v1710376011/EveryNote_iw1qhe.png"
      />
      <h1>Edit {name && name}</h1>
      <form className="editNotebookForm" onSubmit={submitNotebook}>
        <input
          required
          className="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value.replace(/ +(?= )/g, ""))}
        ></input>
        {errors.name && <div>{errors.name}</div>}

        <textarea
          required
          className="new-notebook-info edit-notebook-info"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value.replace(/ +(?= )/g, ""))
          }
        ></textarea>
        {errors.description && <div>{errors.description}</div>}

        <div className="buttons">
          <button
            className="edit-notebook-button"
            type="submit"
            disabled={!name.trim() || !description.trim() || !name.trim() && !description.trim()}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditNotebookModal;
