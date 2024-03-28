import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { allNotes } from "../../redux/notes";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteNoteModal from "../Notes/DeleteNoteModal";
import { notebookThunk } from "../../redux/notebooks";
import './Notes.css'

function AllNotes() {
  const userNotebooks = useSelector((state) => state.notebooks.notebooks);
  const navigate = useNavigate();
  const userNotes = useSelector((state) => state.notes.allNotes);
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
      <h1>Notes ({userNotes?.length})</h1>
      <h3>
        {monthName}, {year}
      </h3>
      <div>
        {userNotes &&
          userNotes.map((note) => (
            <div key={note.id}>
              <div onClick={() => navigate(`/notes/${note.id}`)}>
                {note.name}{" "}
              </div>
              <div>{note.caption}</div>
              <div>{new Date(note?.date_created).toDateString()}</div>
              <OpenModalButton
                modalComponent={<DeleteNoteModal noteId={note.id} />}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default AllNotes;
