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

  const edit = (e) => {
    e.preventDefault();
    navigate(`/notes/${noteId}/edit`);
  };

  useEffect(() => {
    dispatch(noteInfo(Number(noteId)));
    dispatch(notebookThunk());
  }, [dispatch, noteId]);

  return (
    <>
      <h5>{notebook?.name}</h5>
      <h1>{noteDetails?.name}</h1>
      <div>{noteDetails?.caption}</div>
      <p>{noteDetails?.info}</p>
      <div>
        {!tags?.length ? (
          <></>
        ) : (
          <div>
            {tags &&
              tags.map((allTags) =>
                allTags.map((tag) => (
                  <div key={tag.id}>
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
              )}
          </div>
        )}
      </div>
      <div>
        <button onClick={edit}>Edit Note</button>
      </div>
      <OpenModalButton modalComponent={<DeleteNoteModal noteId={noteId} />} />
    </>
  );
}

export default NoteInfo;
