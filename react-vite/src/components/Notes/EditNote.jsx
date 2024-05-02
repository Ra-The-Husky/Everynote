import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editNote, newTags, noteInfo } from "../../redux/notes";
import { homeThunk } from "../../redux/home";
import {notebookThunk} from '../../redux/notebooks'

function EditNote() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteDeets = useSelector((state) => state.notes?.note);
  const notebooks = useSelector((state) => state.notebooks.notebooks);
  const noteNotebook = useSelector((state) => state.notes.noteNotebook);
  // const noteNotebook =
  //   notebooks &&
  //   notebooks?.find((notebook) => notebook.id === noteDeets.notebook_id);
  const notes = useSelector((state) => state.notes?.allNotes);
  const [noteNames, setNoteName] = useState(notes && notes?.map((note) => note.name));
  const [name, setName] = useState(noteDeets && noteDeets.name);
  const [caption, setCaption] = useState(noteDeets && noteDeets.caption);
  const [info, setInfo] = useState(noteDeets && noteDeets.info);
  const [notebook_id, setNotebook_id] = useState(noteDeets?.notebook_id && noteDeets.notebook_id);
  const [tags, setTags] = useState(noteDeets && noteDeets.tags);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(notebookThunk())
    dispatch(noteInfo(Number(noteId))).then((note) => {
      if (note && note.message === "page not found") navigate("/not-found");
      if (note && note.message === "unauthorized") navigate("/unauthorized");
      setName(note.note?.name);
      setInfo(note.note?.info);
      setCaption(note.note?.caption);
      setTags(note.tags.map(tag => tag.name).join(" "));
      setNotebook_id(note.note.notebook_id)
    });
    dispatch(homeThunk());
  }, [dispatch, navigate, noteId]);

  useEffect(() => {
    const errs = {};
    if (!name) {
      errs.name = "Name of note required";
    }
    if (name?.includes("notebook")) {
      errs.name = 'Name of note cannot contain the word "notebook"';
    }
    if (name?.length > 20) {
      errs.name = "Name cannot exceed 20 characters";
    }
    if (noteNames?.includes(name) && name !== noteDeets.name) {
      errs.name = "Note already exists";
    }
    if (!info) {
      errs.info = "Note information required";
    }
    if (info?.length < 30) {
      errs.info = "Note information must be a minimium of 30 characters";
    }
    if (
      typeof tags === "string" &&
      tags.replace(/ +(?= )/g, "").split(" ").length > 5
    ) {
      errs.tags = "only 5 tags are allowed";
    }
    setErrors(errs);
  }, [name, info, noteNames, tags, noteDeets]);

  const submitChanges = async (e) => {
    e.preventDefault();

    const edits = {
      notebook_id,
      name,
      caption,
      info,
      date_created: new Date().toISOString().split("T").splice(0, 1).join(""),
    };
    console.log(edits)
    console.log(noteDeets)

    const tag = tags.split(" ");
    await dispatch(editNote(noteId, edits)).then(() => {
      dispatch(newTags(noteId, tag));
      navigate(`/notes/${noteId}`);
    });
  };

  return (
    <div className="editNoteCont">
      <h1 id="editNoteTitle">Edit Your Note</h1>
      <form onSubmit={submitChanges}>
        <div className="notebook">
          <div>Assigned Notebook</div>
          <select onChange={(e) => setNotebook_id(e.target.value)}>
            <option value={noteNotebook && noteNotebook.notebookId}>
              {noteNotebook && noteNotebook.notebookName}
            </option>
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
            onChange={(e) => setName(e.target.value.replace(/ +(?= )/g, ""))}
          ></input>
          <p>{errors.name}</p>
        </div>

        <div className="editNoteCaption">
          <input
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value.replace(/ +(?= )/g, ""))}
          ></input>
        </div>

        <div className="editNoteContent editContentForm">
          <textarea
            type="text"
            placeholder="Note's Information"
            value={info}
            onChange={(e) => setInfo(e.target.value.replace(/ +(?= )/g, ""))}
          ></textarea>
          <p>{errors.info}</p>
        </div>

        <div className="editNoteFooter">
          <div className="editNoteTags">
            <input
              type="text"
              value={
                Array.isArray(tags)
                  ? tags.map((tag) => tag.name).join(" ")
                  : tags
              }
              onChange={(e) => setTags(e.target.value.replace(/ +(?= )/g, ""))}
            ></input>
             {tags && <div className="error">{errors.tags}</div>}
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
