import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newNotebookThunk } from "../../redux/notebooks";
import { useModal } from "../../context/Modal";

function CreateNotebookModal() {
  const { closeModal } = useModal();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
    if (name.length < 1) {
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

    const newNotebook = {
      name,
      description,
    };
    
    if (Object.values(errors).length) {
      return errors;
    } else {
      dispatch(newNotebookThunk(newNotebook)).then(() => {
        closeModal();
        navigate(`/notebooks`);
      });
    }
  };

  return (
    <div className="createNotebookModal">
      <img
        className="create-notebook-img"
        src="https://res.cloudinary.com/dfxxgifho/image/upload/v1710376011/EveryNote_iw1qhe.png"
      />
      <form className="createNotebookForm" onSubmit={submitNotebook}>
        <h1>Create A New Notebook</h1>

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
          className="new-notebook-info"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value.replace(/ +(?= )/g, ""))
          }
        ></textarea>
        {errors.description && <div>{errors.description}</div>}

        <div className="edit-notebook-buttons">
          <button
            className="logout"
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

export default CreateNotebookModal;
