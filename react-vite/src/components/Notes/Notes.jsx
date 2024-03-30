import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { allNotes } from "../../redux/notes";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteNoteModal from "../Notes/DeleteNoteModal";
import { notebookThunk } from "../../redux/notebooks";
import "./Notes.css";

function AllNotes() {
  //const userNotebooks = useSelector((state) => state.notebooks.notebooks);
  const navigate = useNavigate();
  const userNotes = useSelector((state) => state.notes.allNotes);
  const userNotebooks = useSelector((state) => state.notebooks.notebooks);
  const dispatch = useDispatch();
  const currDate = new Date();
  const month = currDate.getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[month];
  const year = currDate.getFullYear();

  useEffect(() => {
    dispatch(allNotes());
    dispatch(notebookThunk());
  }, [dispatch]);

  return (
    <>
      <h1 className="header">Notes ({userNotes?.length})</h1>
      <h3 className="date">
        {monthName}, {year}
      </h3>
      <div>
        {!userNotes?.length ? (
          <div>
            <p className="note">
              You haven't written any notes yet. Hit the "+" symbol near notes
              to get started!
            </p>
          </div>
        ) : (
          <div>
            {userNotes &&
              userNotes.map((note) => (
                <div key={note.id} className="note">
                  <div
                    className="note-name"
                    onClick={() => navigate(`/notes/${note.id}`)}
                  >
                    {note.name}{" "}
                  </div>
                  <div className="note-caption">{note.caption}</div>
                  <div className="notes-footer">
                    <div className="note-date">
                      {new Date(note?.date_created).toDateString()}
                    </div>
                    <span className="trash">
                      <OpenModalButton
                        modalComponent={
                          <DeleteNoteModal
                            noteId={note.id}
                            notebook={userNotebooks.find(
                              (notebook) => notebook.id === note.notebook_id
                            )}
                          />
                        }
                      />
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AllNotes;
