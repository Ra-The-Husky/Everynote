import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { destroyTag, noteInfo } from "../../redux/notes";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteNoteModal from "./DeleteNoteModal";
import { notebookThunk } from "../../redux/notebooks";

function NoteInfo() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const noteDetails = useSelector((state) => state.notes.note);
  const tags = useSelector((state) => state.notes.tags);
  const notebooks = useSelector((state) => state.notebooks.notebooks);
  const notebook = notebooks?.find((notebook) => notebook.id === noteDetails?.notebook_id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(noteInfo(Number(noteId))).then((res) => {
      if (res.message === "page not found") navigate('/not-found')
      if (res.message === "unauthorized") navigate('/unauthorized')
    });
    dispatch(notebookThunk());
  }, [dispatch, noteId,navigate]);

  return (
    <div className="editNoteCont">
      <h4>Notebook: {notebook?.name}</h4>
      <h1 className="name-of-note">{noteDetails?.name}</h1>
      <div className="editNoteCaption">{noteDetails?.caption}</div>

      <div className="editNoteContent">
        <p>{noteDetails?.info}</p>
      </div>

      <div className="editNoteFooter">
        {!tags?.length ? (
          <></>
        ) : (
          <div className="editNoteTags">
            {
              tags &&
              tags.map((allTags) =>
                allTags.map((tag) => (
                  <div className="editNoteTag" key={tag.id}>
                    #{tag.name}{" "}
                    <div>
                      {" "}
                      <i
                        className="fa-solid fa-square-xmark"
                        onClick={() => dispatch(destroyTag(noteId, tag.id))}
                      ></i>
                    </div>
                  </div>
                ))
              )
            }
          </div>
        )}
        <div className="editNoteButtons">
          <i className="fa-regular fa-pen-to-square" onClick={() => navigate(`/notes/${noteId}/edit`)}></i>
          <OpenModalButton modalComponent={<DeleteNoteModal noteId={noteId} />} />
        </div>
      </div>
    </div >
  );
}

export default NoteInfo;
