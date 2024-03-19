import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { noteInfo } from "../../redux/notes";

function NoteInfo() {
  const { noteId } = useParams();
  const noteDetails = useSelector((state) => state.notes.note);
  const tags = useSelector((state) => state.notes.tags)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(noteInfo(Number(noteId)));
  }, [dispatch, noteId]);

  return (
    <>
      <h1>{noteDetails?.name}</h1>
      <p>{noteDetails?.note}</p>
      <div>
        {tags && tags.map(tag => (
            <p key={tag.id}>{tag.name}</p>
        ))}
      </div>
    </>
  );
}

export default NoteInfo;
