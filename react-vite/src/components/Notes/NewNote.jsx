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
  const [notebook, setNotebook] = useState('');
  const [nb_Id, setNb_id] = useState('')
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [tag3, setTag3] = useState("");
  const [tag4, setTag4] = useState("");
  const [tag5, setTag5] = useState("");
  // const reset = () => {
  //   setName("");
  //   setNote("");
  //   setNotebook_id(0);
  //   setTag1("");
  //   setTag2("");
  //   setTag3("");
  //   setTag4("");
  //   setTag5("");
  // };

  const testNote = () => {
    setName("Test Note");
    setNote("This note is being submitted for testing purposes.");
    setTag1("Testing");
    setTag2("Multi-Tag");
    setTag3("#Tested");
    setTag4("");
    setTag5("");
  };

  const submitNote = async (e) => {
    e.preventDefault();

    const newNote = {
      name,
      note,
    };
    const allTags = [];
    allTags.push(tag1, tag2, tag3, tag4, tag5);

    dispatch(createNote(newNote))

      // .then((confirmedNote) => {
      //   return confirmedNote;
      // })
      // .then((noteInfo) => {
      //   if (allTags.length) {
      //     allTags.map((tag) => {
      //       if (tag) {
      //         dispatch(newTags(noteInfo.id, tag));
      //       }
      //     });
      //   }
      //   navigate(`/notes/${noteInfo.id}`)
      // })
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
          <div>Chosen Notebook: {notebook} </div>
          <select onChange={(e) => setNotebook(e.target.value)}>
            <option value={notebook}></option>
            {notebooks &&
              notebooks.map((notebook) => (
                <option key={notebook.id} value={notebook.id} onChange={(f) => setNb_id(f.target.value)}>
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
