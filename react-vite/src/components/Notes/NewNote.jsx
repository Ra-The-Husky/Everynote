import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allNotes, createNote, newTags } from "../../redux/notes";
import { noteThunk } from "../../redux/home";

function NoteInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const notebooks = useSelector((state) => state.home.notebook);
  const [notebook_id, setNotebook_id] = useState("notebooks[0].id");
  const [tag, setTag] = useState("");
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [tag3, setTag3] = useState("");
  const [tag4, setTag4] = useState("");
  const [tag5, setTag5] = useState("");
  const [errors, setErrors] = useState({});

  const testNote = () => {
    setName("Test Note");
    setNote("This note is being submitted for testing purposes.");
    setNotebook_id(1);
    setTag("Testing");
    // setTag1();
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
    if (!note) {
      errs.note = "Note information required";
    }
    if (note.length < 30) {
      errs.note = "Note information must be a minimium of 30 characters";
    }
    setErrors(errs);
  }, [name, note]);

  const submitNote = async (e) => {
    e.preventDefault();

    const newNote = {
      notebook_id,
      name,
      note,
    };

    const allTags = [];
    allTags.push(tag1, tag2, tag3, tag4, tag5);

    await dispatch(createNote(newNote))
      .then((confirmedNote) => {
        return confirmedNote;
      })
      .then((newNote) => {
        //   if (allTags.length) {
        //     allTags.map((tag) => {
        //       if (tag) {
        //         dispatch(newTags(newNote.id, tag));
        //       }
        //     });
        //   }
        // });
        navigate(`/notes/${newNote.id}`);
      });
  };

  useEffect(() => {
    dispatch(noteThunk());
  }, [dispatch]);

  return (
    <>
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
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <p>{errors.note}</p>
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
            value={tag}
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
            disabled={Object.values(errors)}
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

export default NoteInfo;
