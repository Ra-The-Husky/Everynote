import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editNote, noteInfo } from "../../redux/notes";
import { homeThunk } from "../../redux/home";

function EditNote() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteDeets = useSelector((state) => state.notes?.note);
  const notebooks = useSelector((state) => state.home?.notebook);
  const defaultNotebook = notebooks && notebooks?.find(
    (notebook) => notebook.id === noteDeets.notebook_id
  );
  const notes = useSelector((state) => state.notes?.allNotes);
  const noteNames = notes && notes?.map((note) => note.name);
  const [name, setName] = useState();
  const [caption, setCaption] = useState()
  const [info, setInfo] = useState();
  const [notebook_id, setNotebook_id] = useState(noteDeets?.notebook_id);
  const [tags, setTags] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(noteInfo(Number(noteId))).then((note) => {
      if (note.message === "page not found") navigate('/not-found')
      if (note.message === 'unauthorized') navigate("/unauthorized")
      setName(note.note?.name);
      setInfo(note.note?.info);
      setCaption(note.note?.caption)
      setTags(note.tags);
    });
    dispatch(homeThunk());
  }, [dispatch,navigate,noteId]);

  useEffect(() => {
    const errs = {};
    if (!name) {
      errs.name = "Name of note required";
    }
    if (name?.includes("notebook")) {
      errs.name = 'Name of note cannot contain the word "notebook"'
    }
    if (name?.length > 20) {
      errs.name = "Name cannot exceed 20 characters"
    }
    if (noteNames?.includes(name) && name !== noteDeets.name) {
      errs.name = "Note already exists"
    }
    if (!info) {
      errs.info = "Note information required";
    }
    if (info?.length < 30) {
      errs.info = "Note information must be a minimium of 30 characters";
    }
    setErrors(errs);
  }, [name, info,noteDeets.name,noteNames]);

  const submitChanges = async (e) => {
    e.preventDefault();

    const edits = {
      notebook_id,
      name,
      caption,
      info,
      date_created: new Date().toISOString().split("T").splice(0, 1).join(""),
    };

    // const tag = tags.split(" ");
    // if (tag.length > 5) {
    //   setErrors((errors.tags = "Too many entered tags"));
    // }

    await dispatch(editNote(noteId, edits)).then(navigate(`/notes/${noteId}`));
  };

  return (
    <div className="editNoteCont">
      <h1 id="editNoteTitle">Edit Your Note</h1>
      <form onSubmit={submitChanges}>
        <div className="notebook">
          <div>Assigned Notebook</div>
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

        <div className="editNoteName">
          <input
            type="text"
            placeholder="Your note's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <p>{errors.name}</p>
        </div>

        <div className="editNoteCaption">
          <input
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></input>
        </div>

        <div className="editNoteContent editContentForm">
          <textarea
            type="text"
            placeholder="Note's Information"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          ></textarea>
          <p>{errors.info}</p>
        </div>

        <div className="editNoteFooter">
          <div className="editNoteTags">
            {tags && tags?.map((tag) => <div className="editNoteTag" key={tag.id}>#{tag.name}</div>)}
          </div>

          <div className="editNoteButtons">
            <button
              className="new-note-submit save-disable editNoteSubmit"
              type="submit"
              disabled={Object.values(errors).length}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditNote;
