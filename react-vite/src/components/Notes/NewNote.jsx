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
  const [caption, setCaption] = useState("");
  const notebooks = useSelector((state) => state.notebooks?.notebook);
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
      caption,
      info,
      date_created: new Date().toISOString().split("T").splice(0, 1).join(""),
    };
    console.log(notebook_id)
    const tag = tags.split(" ");
    if (tag.length > 5) {
      setErrors((errors.tags = "Too many tags. Tag limit (5)"));
    }

    if (Object.values(errors).length) {
      return console.log(errors);
    } else {
      await dispatch(createNote(newNote)).then((note) => {
        dispatch(newTags(note.note.id, tag));
        navigate(`/notes/${note.note.id}`);
      });
    }
  };

  return (
    <span className="create-note-outer">
      <span className="create-note-inner">
        <h1 className="note-title">Write A New Note</h1>
        <form className="create-note-form" onSubmit={submitNote}>
          <input
            className="input-name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          {name && <div className="error">{errors.name}</div>}

          <h3 className="create-note-caption">Enter a caption</h3>
          <input
            className="input-name create-note-caption"
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></input>

          <textarea
            className="input-info"
            type="text"
            placeholder="Note Information"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          ></textarea>
          {info && <div className="error">{errors.info}</div>}

          {!params.size ? (
            <div className="options-notebook">Pick A Notebook</div>
          ) : (
            <div className="options-notebook">Notebook</div>
          )}
          <select
            className="notebook-options"
            onChange={(e) => setNotebook_id(e.target.value)}
          >
            {params.size && (
              <option value={+params.get("id")}>{params.get("name")}</option>
            )}
            <option selected disabled hidden>Select a Notebook</option>
            {notebooks &&
              !params.size &&
              notebooks.map((notebook) => (
                <option
                  className="notebook-options"
                  key={notebook.id}
                  value={notebook.id}
                >
                  {notebook.name}
                </option>
              ))}
          </select>

          <div className="tags">
            <div className="tag-info">Add Tags (Optional)</div>

            <input
              className="tag-input"
              placeholder=" All tags need to be separated with spaces"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            ></input>
            {errors.tags && <div>{errors.tags}</div>}
          </div>
          <div className="note-button">
            <button
              className="new-note-submit save-disable"
              type="submit"
              disabled={Object.values(errors).length}
            >
              Save
            </button>
            <button className="new-note-submit" onClick={testNote}>
              Test Note
            </button>
          </div>
        </form>
      </span>
    </span>
  );
}

export default CreateNote;
