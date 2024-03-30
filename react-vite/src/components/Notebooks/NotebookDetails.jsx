import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { getNotebookThunk } from "../../redux/notebooks";
import './Notebooks.css'
import { useNavigate, useParams } from "react-router-dom";

function NotebookDetails() {
    const { notebookId } = useParams()
    const notebook = useSelector((state) => state.notebooks.notebook);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNotebookThunk(notebookId)).then((res) => {
            if (res.message && res.message === "page not found") {
                navigate("/not-found")
            }
            if (res.message && res.message === "unauthorized") {
                navigate("/unauthorized")
            }
        })
    }, [dispatch, notebookId])

    return (
        <span className="notebooks-cont">
            <span className="inner-notebooks-cont">
            <h1>{notebook?.name}</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" >Notes</th>
                        <th scope="col" >Note Description</th>
                    </tr>
                </thead>
                {notebook && notebook.notes?.map((note) => (
                    <tbody key={note.id}>
                        <tr className="row">
                            <td scope="row" className="col2"><span className="notebookName" onClick={() => navigate(`/notes/${note.id}`)}>{note.name}</span></td>
                            <td className="col">{note.info}</td>
                        </tr>
                    </tbody>
                ))}
            </table>
            </span>
        </span>
    );
}

export default NotebookDetails;
