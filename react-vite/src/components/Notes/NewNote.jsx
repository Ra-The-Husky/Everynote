import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { allNotes, createNote, newTags } from "../../redux/notes";
import { homeThunk } from "../../redux/home";

function CreateNote() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const notebooks = useSelector((state) => state.notebooks?.notebooks);
  const [notebook_id, setNotebook_id] = useState();
  const [tags, setTags] = useState("");
  const notes = useSelector((state) => state.notes?.allNotes);
  const noteNames = notes?.map((note) => note.name);
  const [errors, setErrors] = useState({});

  const testNote = () => {
    setName("Tagged Test Note");
    setInfo("This note is being submitted with tags for testing purposes.");
    setNotebook_id(1);
    setTags("Testing NewTag Tags4Days Notetag");
  };

  useEffect(() => {
    dispatch(homeThunk());
    dispatch(allNotes());
  }, [dispatch]);

  useEffect(() => {
    const errs = {};

    if (!name) {
      errs.name = "Name of note required";
    }
    if (name.toLowerCase().includes("notebook")) {
      errs.name = 'Name of note cannot contain the word "notebook"';
    }
    if (noteNames?.includes(name)) {
      errs.name = "Note already exists";
    }
    if (name.length > 20) {
      errs.name = "Name cannot exceed 20 characters";
    }
    if (!info) {
      errs.info = "Note information required";
    }
    if (info.length < 30) {
      errs.info = "Note information must be a minimium of 30 characters";
    }
    setErrors(errs);
  }, [name, info]);

  const submitNote = async (e) => {
    e.preventDefault();

    const newNote = {
      notebook_id,
      name,
      info,
    };
    const tag = tags.split(" ");
    if (tag.length > 5) {
      setErrors((errors.tags = "Too many tags. Tag limit (5)"));
    }

    if (Object.values(errors).length) {
      return console.log(errors);
    } else {
      await dispatch(createNote(newNote)).then((note) => {
        dispatch(newTags(note.id, tag));
        navigate(`/notes/${note.id}`);
      });
    }
  };

  return (
    <>
      <h1>Write A New Note</h1>
      <form onSubmit={submitNote}>
        <div className="name">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <p>{errors.name}</p>
        </div>
        <div className="info">
          <textarea
            type="text"
            placeholder="Note Information"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          ></textarea>
          <p>{errors.info}</p>
        </div>
        <div className="notebook">
          {!params.size ? <div>Pick A Notebook</div> : <div>Notebook</div>}
          <select onChange={(e) => setNotebook_id(e.target.value)}>
            {params.size && (
              <option value={+params.get("id")}>{params.get("name")}</option>
            )}
            {notebooks &&
              !params.size &&
              notebooks.map((notebook) => (
                <option key={notebook.id} value={notebook.id}>
                  {notebook.name}
                </option>
              ))}
          </select>
        </div>
        <div className="tags">
          <p>Add Tags (Optional)</p>
          <p>All tags need to be separated with spaces</p>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          ></input>
          {errors.tags && <p>{errors.tags}</p>}
        </div>
        <div className="buttons">
          <button
            className="button"
            type="submit"
            disabled={Object.values(errors).length}
          >
            Save
          </button>
          <button className="button" onClick={testNote}>
            Test Note
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateNote;
