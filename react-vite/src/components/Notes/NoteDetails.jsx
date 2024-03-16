import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { noteInfo } from "../../redux/notes";

function NoteInfo() {
  const { noteId } = useParams();
  const noteDetails = useSelector((state) => state.notes.note);
  const tags = useSelector((state) => state.notes.tags)
  console.log(noteDetails);
//   const [name, setName] = useState("");
//   const [note, setNote] = useState("");
//   const [tag, setTag] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(noteInfo(Number(noteId)));
  }, [dispatch]);

  return (
    <>
      {/* <form>
        <input
          type="text"
          placeholder="Name"
          value={noteDetails.name}
        //   onChange={(e) => setName(e.target.value)}
        ></input>
      </form> */}
      <h1>{noteDetails?.name}</h1>
      <p>{noteDetails?.note}</p>
      <div>
        {tags && tags.map(tag => (
            <p>{tag.name}</p>
        ))}
      </div>
    </>
  );
}

export default NoteInfo;
