import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { destroyTag, noteInfo } from "../../redux/notes";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteNoteModal from "./DeleteNoteModal";

function NoteInfo() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const noteDetails = useSelector((state) => state.notes.note);
  const tags = useSelector((state) => state.notes.tags);
  const dispatch = useDispatch();

  const edit = (e) => {
    e.preventDefault()
    navigate(`/notes/${noteId}/edit`);
  };

  useEffect(() => {
    dispatch(noteInfo(Number(noteId)));
  }, [dispatch, noteId]);

  return (
    <>
      <h1 className="name-of-note">{noteDetails?.name}</h1>
      <span className="detail-of-note">
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
                      <i className="fa-solid fa-square-xmark" onClick={() => dispatch(destroyTag(noteId, tag.id))}></i>
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
      </span>
    </>
  );
}

export default NoteInfo;
