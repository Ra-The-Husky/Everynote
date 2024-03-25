import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { notebookThunk } from "../../redux/notebooks";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './Notebooks.css'
import { useNavigate } from "react-router-dom";

function Notebooks() {
  const notebooks = useSelector((state) => state.notebooks.notebooks);
  const [show, setShow] = useState(false)
  const ulRef = useRef();
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShow(!show);
  };

  useEffect(() => {
    dispatch(notebookThunk())
  }, [dispatch])

  useEffect(() => {
    if (!show) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShow(false);
        if (notebooks) {
          notebooks.forEach(notebook => {
            if (notebook.show && notebook.show === true) {
              notebook.show = false
            }
          })
        }
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);

  }, [show]);

  const closeMenu = () => setShow(false);
  // const createNotebook = () Navigate()

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
        {notebooks && notebooks.map((notebook) => (
          <tbody key={notebook.id}>
            <tr className="row">
              <td scope="row" className="col2"><span className="notebookName">{notebook.name}</span></td>
              <td className="col">{notebook.description}</td>
              <td className="col"><span><b className='notebookName' onClick={(e) => {
                toggleMenu(e)
                let n = notebooks.find(ele => ele.id === notebook.id)
                n["show"] = !show
                }}>...</b></span>
                  {show && notebook.show && (
                    <div className="profile-dropdown notebookName" ref={ulRef}>
                      <>
                        <OpenModalMenuItem
                          itemText="Create Note"
                          onItemClick={() => {
                            navigate(`/notes/new-note?id=${notebook.id}&name=${notebook.name}`);
                          }}
                          modalComponent={""}
                          onModalClose={() => {notebook.show = false}}
                        />
                        <OpenModalMenuItem
                          itemText="Edit Notebook"
                          onItemClick={closeMenu}
                          modalComponent={'Edit'}
                          onModalClose={() => {notebook.show = false}}
                        />
                        <OpenModalMenuItem
                          itemText="Delete Notebook"
                          onItemClick={closeMenu}
                          modalComponent={'Delete'}
                          onModalClose={() => {notebook.show = false}}
                        />
                      </>
                    </div>
                  )}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}

export default Notebooks;
