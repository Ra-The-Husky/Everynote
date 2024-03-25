import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNote } from "../../redux/notes";
import { homeThunk } from "../../redux/home";

function CreateNote() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const notebooks = useSelector((state) => state.home.notebook);
  const defaultNotebook = notebooks?.find(
    (notebook) => notebook.id === notebooks[0].id
  );
  const [notebook_id, setNotebook_id] = useState(defaultNotebook?.id);
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [tag3, setTag3] = useState("");
  const [tag4, setTag4] = useState("");
  const [tag5, setTag5] = useState("");
  const [errors, setErrors] = useState({});

  const testNote = () => {
    setName("Test Note");
    setInfo("This note is being submitted for testing purposes.");
    setNotebook_id(1);
    // setTag("Testing");
    // setTag1("Tester Tag");
    // setTag2("Multi-Tag");
    // setTag3("#Tested");
    // setTag4("");
    // setTag5("");
  };
  useEffect(() => {
    const errs = {};

    if (!name) {
      errs.name = "Name of note required";
    }
    if (name.toLowerCase().includes('notebook')) {
      errs.name = 'Name of note cannot contain the word "notebook"'
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

    /*
      const tag = tags.split(' ')

     */

    const allTags = [];
    allTags.push(tag1, tag2, tag3, tag4, tag5);

    await dispatch(createNote(newNote)).then((note) => {
      //dispatch()
      navigate(`/notes/${note.id}`)
    })
  };

  useEffect(() => {
    dispatch(homeThunk());
  }, [dispatch]);

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
          <div>Pick A Notebook</div>
          <select onChange={(e) => setNotebook_id(e.target.value)}>
            {notebooks &&
              notebooks.map((notebook) => (
                <option key={notebook.id} value={notebook.id}>
                  {notebook.name}
                </option>
              ))}
          </select>
        </div>
        <div className="tags">
          <p>Add Tags (Optional)</p>
          <input
            type="text"
            value={tag1}
            onChange={(e) => setTag1(e.target.value)}
          ></input>
          <input
            type="text"
            value={tag2}
            onChange={(e) => setTag2(e.target.value)}
          ></input>
          <input
            type="text"
            value={tag3}
            onChange={(e) => setTag3(e.target.value)}
          ></input>
          <input
            type="text"
            value={tag4}
            onChange={(e) => setTag4(e.target.value)}
          ></input>
          <input
            type="text"
            value={tag5}
            onChange={(e) => setTag5(e.target.value)}
          ></input>
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
