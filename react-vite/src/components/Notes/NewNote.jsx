import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNote, newTags } from "../../redux/notes";
import { noteThunk } from "../../redux/home";

function NoteInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [notebook_id, setNotebook_id] = useState(0);
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [tag3, setTag3] = useState("");
  const [tag4, setTag4] = useState("");
  const [tag5, setTag5] = useState("");
  const reset = () => {
    setName("");
    setNote("");
    setNotebook_id(0);
    setTag1("");
    setTag2("");
    setTag3("");
    setTag4("");
    setTag5("");
  };
  const notebooks = useSelector((state) => state.home.notebook);

  const testNote = () => {
    setName("Test Note");
    setNote("This note is being submitted for testing purposes.");
    setTag1("");
    setTag2("");
    setTag3("");
    setTag4("");
    setTag5("");
  };

  const submitNote = async (e) => {
    e.preventDefault();

    const newNote = {
      notebook_id,
      name,
      note,
    };

    await dispatch(createNote(newNote));
    console.log("The added note", newNote);
    // .then((validNote) => {
    //   console.log(validNote)
    //   if (allTags.length) {
    //     allTags.map((tag) => dispatch(newTags(validNote.id, tag)));
    //   }
    // navigate(`/notes/${newNote.id}`)
    // reset()
  };

  useEffect(() => {
    dispatch(noteThunk());
  }, [dispatch]);

  return (
    <>
      <form onSubmit={submitNote}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <textarea
            type="text"
            placeholder="Note Information"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <div>
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
        <div>
          <select>
            {notebooks &&
              notebooks.map((notebook) => (
                <option
                  key={notebook.id}
                  value={notebook.id}
                  onChange={(e) => setNotebook_id(e.target.value)}
                >
                  {notebook.name}
                </option>
              ))}
          </select>
        </div>
        <button type="submit">Save</button>
        <button onClick={testNote}>Test Note</button>
      </form>
    </>
  );
}

export default NoteInfo;
