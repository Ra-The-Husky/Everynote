import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allNotes } from "../../redux/notes";

function AllNotes() {
  const navigate = useNavigate();
  const userNotes = useSelector((state) => state.notes.notes);
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
            <div key={note.id} onClick={() => navigate(`/notes/${note.id}`)}>
              <div>Note's name: {note.name} </div>
              <p>A short description of the note here...</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default AllNotes;
