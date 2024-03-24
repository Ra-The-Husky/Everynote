import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editNote, noteInfo } from "../../redux/notes";
import { noteThunk } from "../../redux/home";

function EditNote() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteDeets = useSelector((state) => state.notes.note);
  const notebooks = useSelector((state) => state.home.notebook);
  const defaultNotebook = notebooks?.find(
    (notebook) => notebook.id === noteDeets.notebook_id
  );
  const [name, setName] = useState(noteDeets?.name);
  const [note, setNote] = useState(noteDeets?.note);
  const [notebook_id, setNotebook_id] = useState(noteDeets?.notebook_id);
  const [tag1, setTag1] = useState(noteDeets?.tag1);
  const [tag2, setTag2] = useState(noteDeets?.tag2);
  const [tag3, setTag3] = useState(noteDeets?.tag3);
  const [tag4, setTag4] = useState(noteDeets?.tag4);
  const [tag5, setTag5] = useState(noteDeets?.tag5);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(noteInfo(Number(noteId)));
    dispatch(noteThunk());
  }, [dispatch, noteId]);

  
  useEffect(() => {
    const errs = {};
    if (!name) {
      errs.name = "Name of note required";
    }
    if (!note) {
      errs.note = "Note information required";
    }
    if (note?.length < 30) {
      errs.note = "Note information must be a minimium of 30 characters";
    }
    setErrors(errs);
  }, [name, note]);

  const submitChanges = async (e) => {
    e.preventDefault();

    const edits = {
      notebook_id,
      name,
      note,
    };

    const allTags = [];
    allTags.push(tag1, tag2, tag3, tag4, tag5);

    await dispatch(editNote(noteId, edits)).then(navigate(`/notes/${noteId}`));
  };

  return (
    <>
      <h1>Edit Your Note</h1>
      <form onSubmit={submitChanges}>
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
            <option value={defaultNotebook?.id}>{defaultNotebook?.name}</option>
            {notebooks &&
              notebooks?.map((notebook) => (
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
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
}

export default EditNote;
