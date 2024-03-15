import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { notebookThunk } from "../../redux/notebooks";
import './Notebooks.css'

function Notebooks() {
  const notebooks = useSelector((state) => state.notebooks.notebooks);

  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    dispatch(notebookThunk())
  }, [dispatch]);
  return (
    <>
      <h1>Notebooks</h1>
      <table className="table">
        <thead >
          <tr>
            <th scope="col" >Title</th>
            <th scope="col" >Description</th>
            <th scope="col" >Actions</th>
          </tr>
        </thead>
        <tbody>
          {notebooks && notebooks.map((notebook) => (
            <tr key={notebook.id} className="row">
              <td scope="row" className="col notebookName">{notebook.name}&nbsp;&nbsp;<i className="fa-solid fa-angle-right" onClick={(e) => {
                if (hidden) {
                  e.target.className = "fa-solid fa-angle-down"
                  setHidden(false)
                } else {
                  e.target.className = "fa-solid fa-angle-right"
                  setHidden(true)
                }
              }}></i>{!hidden && notebook.notes.map(note => (
                <span className="table2">
                  <div>{note.name}</div>
                </span>
              ))}</td>
              <td className="col">{notebook.description}</td>
              <td className="col"><button>test</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Notebooks;
